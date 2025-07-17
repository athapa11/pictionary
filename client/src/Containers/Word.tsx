import React from 'react'
import { useSignalR } from '../Context/useSignalR';
import { useSession } from '../Context/useSession';

const Word: React.FC = () => {
  const connection = useSignalR();
  const { word, role } = useSession();

  if (!connection) {
    console.error("no connection");
    return null;
  }

  return (
    <>
      {role === 'drawer' && (
        <h1 className='font-bold tracking-widest text-2xl fontsize- text-center text-[#0e1115]'>{word}</h1>
      )}

      {role === 'guesser' && (
        <div className="flex justify-center gap-4 mt-2 text-[#0e1115] text-xl">
          GUESS THIS
          {Array.from({length}).map((_, i) => (
            <span 
              key={i}
              className="border-b-2 border-black text-2xl text-center min-w-[1rem]"
            >
              &nbsp;
            </span>
          ))}
          <sup className='text-black text-xl'>{length}</sup>
        </div>
      )}
    </>
  );
};

export default Word;