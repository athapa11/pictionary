import React from 'react'
import ChatList from './ChatList'
import ChatInput from './ChatInput'
import ChatBubble from './ChatBubble';
import { useAuth } from '../../Context/useAuth';
import * as signalR from "@microsoft/signalr";

interface Props {
}

const username = 'Bonnie Green';
const time = '11:46';
const content = "That's awesome. I think our users will really appreciate the improvements.";
const isDelivered = false;
const avatar = "../logo192.png"

const ChatRoom = (props: Props) => {
  const {user} = useAuth();
  console.log("user state", user);

  return (
      <div className='min-h-screen !bg-[#0e1115] !text-[#e9eef2]'>
      <ChatBubble username={user} time={time} content={content} isDelivered={isDelivered} avatar={avatar}/>
      <ChatBubble username={user} time={time} content={content} isDelivered={isDelivered} avatar={avatar}/>
      <ChatBubble username={user} time={time} content={content} isDelivered={isDelivered} avatar={avatar}/>
      <ChatBubble username={user} time={time} content={content} isDelivered={isDelivered} avatar={avatar}/>
      <ChatBubble username={user} time={time} content={content} isDelivered={isDelivered} avatar={avatar}/>
      <ChatInput/>
    </div>
  )
}

export default ChatRoom