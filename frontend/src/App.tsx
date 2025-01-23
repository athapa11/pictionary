import { Outlet } from 'react-router';
import Navbar from './Components/Navbar/Navbar';
import { UserProvider } from './Context/useAuth';

function App() 
{
  return(
    <UserProvider>
      <Outlet/>
    </UserProvider>
  )
}

export default App;
