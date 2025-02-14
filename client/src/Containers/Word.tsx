import React from 'react'
import { useSignalR } from '../Context/useSignalR';
import { useSession } from '../Context/useSession';

const Word: React.FC = () => {
  const connection = useSignalR();

  if (!connection) {
    console.error("no connection");
    return null;
  }

  const { session } = useSession();
  return (
    <h1 className='font-semibold tracking-widest text-3xl text-center'>{session.currentWord}</h1>
  );
};

export default Word;