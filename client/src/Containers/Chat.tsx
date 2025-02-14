import React from 'react';
import ChatInput from '../Components/Chat/ChatInput';
import ChatBubble from '../Components/Chat/ChatBubble';
import { useChat } from '../Features/useChat';

const Chat: React.FC = () => {
  const {
    guesses, chatInput,
    onInputChange,
    onGuessSubmit,
  } = useChat();

  return (
    <>
      <div className="flex-1 overflow-y-auto p-1">
        {guesses.map((msg, index) =>
          <ChatBubble key={index} name={msg.player} content={msg.guess}/>
        )}
      </div>
      <div className="sticky bottom-0 p-1">
        <ChatInput guess={chatInput} onGuessSubmit={onGuessSubmit} onInputChange={onInputChange}/>
      </div>
    </>
  );
};

export default Chat;