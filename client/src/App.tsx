import { Outlet } from 'react-router';
import { SignalRProvider } from './Context/useSignalR';
import { SessionProvider } from './Context/useSession';

function App() {
  return(
    <SignalRProvider>
      <SessionProvider>
        <div className='min-h-screen bg-[#0e1115] text-[#e9eef2]'>
          <Outlet/>
        </div>
      </SessionProvider>
    </SignalRProvider>
  )
}

export default App