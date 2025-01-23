import { Outlet } from 'react-router';
import { UserProvider } from './Context/useAuth';

function App() {
  return(
    <UserProvider>
      <Outlet/>
    </UserProvider>
  )
}

export default App