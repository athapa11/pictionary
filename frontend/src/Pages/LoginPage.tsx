import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../Services/auth';
import { useAuth } from '../Context/useAuth';

const LoginPage = () => {

  const navigate = useNavigate();
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
    <div className='min-h-screen !bg-[#0e1115] !text-[#e9eef2]'>
      <form onSubmit={handleLogin}>
        <input 
          className='bg-[#0d1826]' 
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

export default LoginPage