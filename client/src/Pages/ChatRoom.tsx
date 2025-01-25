import React, { ChangeEvent, useEffect, useState } from 'react';
import ChatInput from '../Components/Chat/ChatInput';
import ChatBubble from '../Components/Chat/ChatBubble';
import { useAuth } from '../Context/useAuth';
import avatar from "../assets/react.svg";
import { startConnection, sendMessage, onReceiveMessage, onReceiveMessageOff } from '../Services/signalr';

const time = '11:46';
const isDelivered = false;

const ChatRoom: React.FC = () => 
{
  const { user } = useAuth();
  const [chatInput, setChatInput] = useState<string>('')
  const [messages, setMessages] = useState<{user: string, message: string}[]>([]);

  useEffect(() => {
    startConnection();

    const messageHandler = (user: string, message: string) => {
      setMessages((prev) => [...prev, { user, message }]);
    }

    onReceiveMessage(messageHandler);

    return () => {
      onReceiveMessageOff(messageHandler);
    };
  }, []);

  const onMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
    console.log("Chat input onChange: ", e.target.value)
  };

  const onMessageSubmit = (e: any) => {
    e.preventDefault();
    if(chatInput.trim() !== "")
    {
      sendMessage(user, chatInput);
      setChatInput(""); // wipe after send
    }
  };

  return (
      <div className='flex flex-col'>
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, index) =>
            <ChatBubble key={index} username={msg.user} content={msg.message} avatar={avatar}/>
          )}
        </div>
        <div className="sticky bottom-0">
          <ChatInput message={chatInput} onMessageSubmit={onMessageSubmit} onMessageChange={onMessageChange}/>
        </div>
      </div>
  )
}

export default ChatRoom