import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import * as signalR from "@microsoft/signalr";

const SignalRContext = createContext<signalR.HubConnection>({} as signalR.HubConnection);
const hubUrl = import.meta.env.VITE_SERVER_URL;

export const SignalRProvider = ({children}: {children: React.ReactNode}) => 
{
  const connectionRef = useRef<signalR.HubConnection | null>(null);
	const [ready, setReady] = useState(false);

  useEffect(() => {
		const connection = new signalR.HubConnectionBuilder()
			.withUrl(hubUrl, {
				withCredentials: true
			})
			.withAutomaticReconnect()
			.configureLogging(signalR.LogLevel.Information)
			.build();

		connectionRef.current = connection;

		connection.start()
		.then(() => {
			console.log("Connected to SignalR");
			setReady(true);
		})
		.catch((error) => {
			console.error("Connection to SignalR failed: ", error);
			setTimeout(() => connection.start(), 3000);
		})

		connection.onclose((error) => {
			console.error("SignalR connection closed: ", error);
		});
		
    return () => { 
      connection.stop(); // connection cleanup on unmount
    };
  }, []);

	// prevent rendering null connection
	if(!ready || !connectionRef.current) {
		return null;
	}
  
  return (
    <SignalRContext.Provider value={ connectionRef.current }> 
      { children } 
    </SignalRContext.Provider>
  );
};

export const useSignalR = (): signalR.HubConnection => {
	const connection = useContext(SignalRContext);
	if(!connection){
		throw new Error("SignalR connection not established");
	}
	return connection;
};