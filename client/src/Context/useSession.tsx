import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSignalR } from './useSignalR';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';


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
  currentPlayer: Player;
  joinSession: () => Promise<void>;
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
  currentPlayer: defaultPlayer,
  joinSession: async () => {},
  createSession: async () => {}
});


export const SessionProvider = ({children}: {children: React.ReactNode}) => 
{
  const navigate = useNavigate();
  const connection = useSignalR();
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(defaultPlayer);
  const [session, setSession] = useState(defaultSession);
  const { sessionId, playerName } = useParams();
  const BASE_API_URL = 'http://localhost:5162/api/session';

  useEffect(() => {
    connection.on('PlayerJoined', (player: Player) => {
      setPlayers((prev) => [...prev, player]);
      setCurrentPlayer(player);
    });

    connection.on('PlayerLeft', (player: Player) => {
      setPlayers((prev) => prev.filter((p) => p !== player));
    });

    return () => {
      connection.off('PlayerJoined');
      connection.off('PlayerLeft');
    }
  }, [connection]);

  useEffect(() => {
    // redirect to homepage if page
    navigate('/');
  }, [navigate]);

  const joinSession = async () => {
    if(sessionId && playerName)
    {
      try{
        await axios.post(
          `${BASE_API_URL}/join-session/${sessionId}/${playerName}`, 
          { playerName }, 
          { headers: { "Content-Type": "application/json" } }
        );
      }
      catch(error){
        console.error("Error creating session:", error);
      }
    }
    else{
      console.error("Session id or player name not found");
    }
  };

  const createSession = async (playerName: string) => {
    try{
      const response = await axios.post(
        `${BASE_API_URL}/create-session`, 
        { playerName }, 
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);
      setSession(response.data);
      setPlayers(response.data.players);
    }
    catch(error: any){
      console.error("Error creating session:", error);
    }
  }

  return(
    <SessionContext.Provider value={{ session, currentPlayer, joinSession, createSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
}