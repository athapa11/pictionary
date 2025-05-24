import React, { createContext, useContext, useState } from 'react'
import { useSignalR } from './useSignalR';
import axios from 'axios';
import { useNavigate } from 'react-router';


interface Player {
  id: string;
  name: string;
  score: number;
}
interface Session {
  id: string;
  currentWord: string;
  drawerId: string;
  players: Player[];
}
interface SessionContextType {
  session: Session;
  players: Player[];
  currentPlayer: Player | null;
  joinSession: (playerName: string, sessionId: string) => Promise<void>;
  createSession: (playerName: string) => Promise<void>;
}


const defaultSession: Session = {
  id: '', 
  currentWord: '', 
  drawerId: '', 
  players: []
};
const defaultPlayer: Player = {
  id: '', 
  name: 'default',
  score: 0
};
const SessionContext = createContext<SessionContextType>({
  session: defaultSession,
  players: [],
  currentPlayer: defaultPlayer,
  joinSession: async () => {},
  createSession: async () => {}
});


export const SessionProvider = ({children}: {children: React.ReactNode}) => 
{
  const navigate = useNavigate();
  const connection = useSignalR();

  const [session, setSession] = useState(defaultSession);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const BASE_API_URL = 'http://localhost:5162/api/session';

  const registerHandlers = (connection: signalR.HubConnection) => 
  {
    const onPlayerJoined = (player: Player, session: Session) => {
      console.log("PlayerJoined event received", player);

      setSession(session);
      setPlayers(session.players ?? []);
    };

    const onPlayerLeft = (player: Player) => {
      setPlayers((prev) => prev.filter((p) => p.id !== player.id));
      setCurrentPlayer((prev) => (prev && prev.id === player.id ? null : prev)); // remove current player
    };
    
    connection.off("PlayerJoined");
    connection.off("PlayerLeft");
    connection.on('PlayerJoined', onPlayerJoined);
    connection.on('PlayerLeft', onPlayerLeft);
  };

  const createSession = async (playerName: string) => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/create-session`, 
        { playerName }, 
        { headers: { "Content-Type": "application/json" } }
      );

      console.log('response: ', response.data);

      if(response.data) {
        const sessionId = response.data.sessionId;
        const players: Player[] = Object.values(response.data.players ?? {});

        setCurrentPlayer(players.find((p: Player) => p.name === playerName) || null);

        if (connection && connection.state === "Connected") {
          registerHandlers(connection);
          await connection.invoke("JoinSession", sessionId, playerName);
        }

        navigate(`/room/${sessionId}`);
      }
    }
    catch(error: any){
      console.error("Error creating session:", error);
    }
  }


  const joinSession = async (playerName: string, sessionId: string) => 
  {
    if(!sessionId || !playerName) {
      console.error("Missing session id or player name");
      return;
    }

    try{
      console.log("payload contents:", JSON.stringify({ playerName }));

      const response = await axios.post(
        `${BASE_API_URL}/join-session/${sessionId}`, 
        { playerName }, 
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ API response:", response.data);

      if(response.data)
      {
        const players: Player[] = Object.values(response.data.players ?? {});

        setCurrentPlayer(players.find((p: Player) => p.name === playerName) || null);

        if (connection && connection.state === "Connected") {
          registerHandlers(connection);
          await connection.invoke("JoinSession", sessionId, playerName);
        }
        
        navigate(`/room/${sessionId}`);

        console.log("All players =", players);
      }
    }catch(error){
      console.error("Error creating session:", error);
    }
  };

  return(
    <SessionContext.Provider value={{ session, players, currentPlayer, joinSession, createSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
}