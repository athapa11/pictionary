import React from 'react'
import { useSession } from '../Context/useSession';

const Scoreboard: React.FC = () => {
  const { session } = useSession();

  const players = Object.values(session.players);
  
  const playersRanked = players.sort((a, b) => b.score - a.score);

  return (
    <>
      {playersRanked.map((player, index) => (
        <div key={player.id} className='flex flex-row py-1 px-2 bg-blue-400 rounded-lg'>
          <span className='w-auto font-bold text-lg'>#{index + 1}</span>
          <div className='flex-grow flex flex-col items-center'>
            <span className='font-medium'>{player.name}</span>
            <span className='text-sm'>{player.score} points</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Scoreboard;