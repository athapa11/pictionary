import React, { useState } from 'react'
import { authenticate } from '../Services/auth';
import { useAuth } from '../Context/useAuth';

const Login = () => 
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
    <div className='min-h-screen bg-[#0e1115] text-[#e9eef2]'>
      <h1></h1>
      <form onSubmit={handleLogin}>
        <input 
          className='text-[#e9eef2]' 
          type='text' 
          placeholder='Enter a name' 
          value={nickname} 
          onChange={handleNameChange}
        />
        <button type='submit'>Enter</button>
      </form>
    </div>
  )
}

export default Login