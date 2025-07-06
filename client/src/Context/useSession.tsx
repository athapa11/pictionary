import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSignalR } from './useSignalR';
import { useNavigate } from 'react-router';
import { HubConnectionState } from '@microsoft/signalr';


export interface Player {
  name: string;
  score: number;
}

type Role = 'drawer' | 'guesser' | null;

interface SessionContextType {
  players: Player[];
  currentPlayer: Player | null;
  word: string | null;
  role: Role;
  joinSession: (playerName: string) => void;
}

const SessionContext = createContext<SessionContextType | null>(null);


export const SessionProvider = ({children}: {children: React.ReactNode}) => 
{
  const connection = useSignalR();
  const navigate = useNavigate();
  
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [word, setWord] = useState<string | null>(null);

  useEffect(() => {
    if (connection?.state === HubConnectionState.Connected && !currentPlayer) {
      navigate('/', { replace: true });
    }
  }, [connection, currentPlayer, navigate]);
  
  useEffect(() => 
  {
    if(!connection) return;

    const onPlayerJoined = (joiner: Player, players: Player[]) => {
      setCurrentPlayer(joiner);
      setPlayers(players);
      navigate('/room'); // assuming global room for now
    };

    const onPlayerLeft = (leaver: Player, players: Player[]) => {
      setPlayers(players);
      setCurrentPlayer(prev => 
        (prev && prev.name === leaver.name ? null : prev)); // remove current player
    };

    const onStartDrawing = (word: string) => {
      setRole('drawer');
      setWord(word);
    }

    const onStartGuessing = () => {
      setRole('guesser');
      setWord(null);
    }

    connection.on("PlayerJoined", onPlayerJoined);
    connection.on("PlayerLeft", onPlayerLeft);
    connection.on("StartDrawing", onStartDrawing);
    connection.on("StartGuessing", onStartGuessing);

    return () => {
      connection.off("PlayerJoined");
      connection.off("PlayerLeft");
      connection.off("StartDrawing");
      connection.off("StartGuessing");
    };
  }, [connection]);

  // methods to invoke signalr hub
  const joinSession = (name: string) => {
    connection.invoke('Join', name);
  }

  return(
    <SessionContext.Provider value={{ players, currentPlayer, role, word, joinSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if(!context) { 
    throw new Error('useSession cant be null')
  }
  return context;
}