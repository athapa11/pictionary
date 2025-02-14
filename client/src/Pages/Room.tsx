import React from 'react';
import Draw from '../Containers/Draw';
import Chat from '../Containers/Chat';
import Scoreboard from '../Containers/Scoreboard';
import { useSignalR } from '../Context/useSignalR';
import { useSession } from '../Context/useSession';

const Room: React.FC = () => {
  const connection = useSignalR();

  if (!connection) {
    console.error("no connection");
    return null;
  }

  const { session } = useSession();

  return (
    <div className="w-screen h-screen flex flex-col items-center p-20">
      <div className="w-[1400px] flex justify-center bg-blue-500 rounded-lg m-2">
        <div className="w-1/8"></div> 
        <div className='flex-grow flex items-center justify-center p-4'>
          <h1 className='font-semibold tracking-widest text-3xl text-center'>{session.currentWord}</h1>
        </div>
        <div className="w-1/4"></div>
      </div>

      <div className="flex w-[1400px] h-[540px]">
        <div className="w-1/8 h-full bg-blue-950 mr-2 rounded-lg">
          <Scoreboard />
        </div>

        <div className="flex-grow h-full flex flex-col bg-blue-950 rounded-lg">
          <Draw />
        </div>

        <div className="w-1/6 h-full flex flex-col bg-blue-950 rounded-lg ml-2">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Room;
