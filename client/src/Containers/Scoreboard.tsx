import React from 'react'
import { useSession } from '../Context/useSession';

const Scoreboard: React.FC = () => {
  const { players } = useSession();

  const playersArr = Object.values(players);
  
  const playersRanked = playersArr.sort((a, b) => b.score - a.score);

  return (
    <>
      {playersRanked.map((player, index) => (
        <div key={player.name} className='flex flex-row py-1 px-2 mb-1 bg-white rounded-lg text-[#0e1115]'>
          <span className='w-auto font-bold text-lg'> #{index + 1} </span>
          <div className='flex-grow flex flex-col items-center'>
            <span className='font-medium'> {player.name} </span>
            <span className='text-sm'>{player.score} points </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Scoreboard;