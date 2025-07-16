import { Outlet } from 'react-router';
import { SignalRProvider } from './Context/useSignalR';
import { SessionProvider } from './Context/useSession';

function App() {
  return(
    <SignalRProvider>
      <SessionProvider>
        <div className='min-h-screen bg-blue-900 text-[#e9eef2]'>
          <Outlet/>
        </div>
      </SessionProvider>
    </SignalRProvider>
  )
}

export default App