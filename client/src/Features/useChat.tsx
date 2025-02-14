import { ChangeEvent, useEffect, useState } from 'react'
import { useSignalR } from '../Context/useSignalR';
import { useSession } from '../Context/useSession';

export const useChat = () => {
  const { session, currentPlayer } = useSession();
  const connection = useSignalR();
  const [chatInput, setChatInput] = useState<string>('')
  const [guesses, setGuesses] = useState<{player: string, guess: string}[]>([]);

  useEffect(() => {
    connection.on("ReceiveGuess", (player: string, guess: string) => {
      setGuesses((prev) => [...prev, { player, guess }]);
    });

    return () => {
      connection.off("ReceiveGuess");
    };
  }, [connection]);

  const sendGuess = async (sessionId: string, playerId: string, guess: string): Promise<void> => {
    if(!connection){ 
      return console.error("SignalR connection not found") 
    }

    if(chatInput.trim() !== "")
    {
      try{
        await connection.invoke("SendGuess", sessionId, playerId, guess);
        setChatInput(""); // wipe after send
      } 
      catch (error) {
        console.error("Error sending guess: ", error);
      }
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
    console.log("Chat input onChange: ", e.target.value)
  };

  const onGuessSubmit = (e: any) => {
    e.preventDefault();
    if (!session.id || !currentPlayer.id) {
      console.error("Session ID or Player ID is missing");
      return;
    }
    // sendGuess(session.sessionId, currentPlayer?.id, chatInput);
  };

  return {
    guesses, chatInput,
    onInputChange,
    onGuessSubmit,
  };
};