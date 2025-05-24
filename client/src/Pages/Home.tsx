import React, { useState } from 'react'
import { validate } from '../Services/validate';
import { useSession } from '../Context/useSession';
import { useParams } from 'react-router-dom';

const Login: React.FC = () => 
{
  const { sessionId } = useParams();
  const [name, setName] = useState<string>('');
  const { joinSession, createSession } = useSession();

  const handleCreate = (event: React.MouseEvent<HTMLButtonElement>) => 
  {
    event.preventDefault();
    if(validate(name)){
      createSession(name);
    }
    else{
      alert('Nickname invalid');
    }
  };

  const handleJoin = (event: React.MouseEvent<HTMLButtonElement>) =>
  {
    event.preventDefault();
    if(validate(name)){
      // create room if a session doesnt already exist
      console.log("session id =", sessionId);
      if(!sessionId) { 
        alert('session not found');
      } 
      else{
        joinSession(name, sessionId);
      }
    }
    else{
      alert('Nickname invalid');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form className='flex flex-col gap-4'>
        <input 
          className='text-[#e9eef2]' 
          type='text' 
          placeholder='Nickname' 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />
        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded' 
          onClick={handleJoin}
        >
          Join
        </button>
        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded' 
          onClick={handleCreate}
        >
          Create Game
        </button>
      </form>
    </div>
  );
};

export default Login