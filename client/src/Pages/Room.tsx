import React from 'react';
import Draw from '../Containers/Draw';
import Chat from '../Containers/Chat';
import Scoreboard from '../Containers/Scoreboard';
import Word from '../Containers/Word';

const Room: React.FC = () => {

  return (
    <div className="w-screen h-screen flex flex-col items-center p-20">
      <div className="w-[1400px] h-[50px] flex justify-center bg-[#dce2e7] rounded-lg m-2">
        <div className="w-1/8"></div> 
        <div className='flex-grow flex items-center justify-center p-4'>
          <Word/>
        </div>
        <div className="w-1/4"></div>
      </div>

      <div className="flex items-stretch w-[1400px] h-[500px]">
        <div className="w-1/8 h-full bg-[#dce2e7] p-1 mr-2 rounded-lg">
          <Scoreboard />
        </div>

        <div className="flex-grow h-full flex flex-col rounded-lg">
          <Draw />
        </div>

        <div className="w-1/6 h-full flex flex-col bg-[#dce2e7] rounded-lg ml-2">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Room;
