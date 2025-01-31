import { Outlet } from 'react-router';
import { UserProvider } from './Context/useAuth';

function App() {
  return(
    <UserProvider>
      <div className='min-h-screen bg-[#0e1115] text-[#e9eef2]'>
        <Outlet/>
      </div>
    </UserProvider>
  )
}

export default App