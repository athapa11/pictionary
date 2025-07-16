import React, { FormEvent, useState } from 'react'
import { validate } from '../Services/validate';
import { useSession } from '../Context/useSession';

const Home: React.FC = () => 
{
  const [name, setName] = useState<string>('');
  const { joinSession } = useSession();

  const handleJoin = (e: FormEvent) => 
  {
    e.preventDefault();
    if(validate(name)){
      joinSession(name);
    }
    else{
      alert('Nickname invalid');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form className='flex flex-col gap-4' onSubmit={handleJoin}>
        <input 
          className='text-[#e9eef2]' 
          type='text' 
          placeholder='Nickname' 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />
        <button 
          type='submit'
          className='bg-lime-400 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded' 
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default Home