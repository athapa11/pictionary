import React, { useState } from 'react'
import { authenticate } from '../Services/auth';
import { useAuth } from '../Context/useAuth';

const Login: React.FC = () => 
{
  const [nickname, setNickname] = useState<string>('');
  const {user, login} = useAuth();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(authenticate(nickname))
    {
      login(nickname);
      console.log('nickname:', user);
    }
    else{
      alert('Nickname cannot be empty');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input 
          className='text-[#e9eef2]' 
          type='text' 
          placeholder='Name' 
          value={nickname} 
          onChange={handleNameChange}
        />
        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded' 
          type='submit'
        >
          Enter
        </button>
      </form>
    </>
  )
}

export default Login