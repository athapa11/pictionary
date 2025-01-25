import React, { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';


type UserContextType = {
  user: string;
  login: (name: string) => void;
  logout: () => void;
};

type Props = {children: React.ReactNode}; // use props for context

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({children}: Props) => 
{
  const navigate = useNavigate();
  const [user, setUser] = useState<string>('');

  const login = (name: string) => {
    setUser(name);
    navigate('/chat');
  }

  const logout = () => {
    setUser('');
    navigate('/');
  };

  return(  
    <UserContext.Provider value={{user, login, logout}}>
      {children}
    </UserContext.Provider>
  )
}

export const useAuth = () => React.useContext(UserContext);