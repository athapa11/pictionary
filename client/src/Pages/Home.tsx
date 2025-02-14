import React, { useState } from 'react'
import { validate } from '../Services/validate';
import { useSession } from '../Context/useSession';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => 
{
  const [nickname, setNickname] = useState<string>('');
  const {createSession} = useSession();
  const navigate = useNavigate();

  const handleCreateSession = (event: React.FormEvent<HTMLFormElement>) => 
  {
    event.preventDefault();
    if(validate(nickname))
    {
      createSession(nickname);
      navigate('/room');
    }
    else{
      alert('Nickname cannot be empty');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleCreateSession} className='flex flex-col gap-4'>
        <input 
          className='text-[#e9eef2]' 
          type='text' 
          placeholder='Nickname' 
          value={nickname} 
          onChange={handleNameChange}
        />
        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded' 
          type='submit'
        >
          Play
        </button>
        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded' 
          type='submit'
        >
          Create Room
        </button>
      </form>
    </div>
  )
}

export default Login