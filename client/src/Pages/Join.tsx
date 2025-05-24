import React, { useEffect, useState } from 'react'
import { validate } from '../Services/validate';
import { useSession } from '../Context/useSession';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Join: React.FC = () => 
{
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  const [name, setName] = useState<string>('');
  const navigate = useNavigate();
  const { joinSession } = useSession();

  useEffect(() => {
    if(!sessionId) {
      console.log("session id is ", sessionId);
      alert('session id not found');
      navigate('/');
    }
  }, [sessionId]);

  const handleJoin = (event: React.FormEvent) =>
  {
    event.preventDefault();
    if(validate(name)) {
      joinSession(name, sessionId!);
    } else {
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
          type="submit"
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded' 
        > Join </button>
      </form>
    </div>
  );
};

export default Join