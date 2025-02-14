import React, { createContext, useContext, useEffect, useState } from 'react'
import * as signalR from "@microsoft/signalr";

const SignalRContext = createContext<signalR.HubConnection>({} as signalR.HubConnection);

export const SignalRProvider = ({children}: {children: React.ReactNode}) => 
{
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  useEffect(() => {
		const newConnection = new signalR.HubConnectionBuilder()
			.withUrl("http://localhost:5162/hub", {
				withCredentials: true
			})
			.withAutomaticReconnect()
			.configureLogging(signalR.LogLevel.Information)
			.build();
		
		setConnection(newConnection);
			
		const startConnection = async (): Promise<void> => {
			try {
				await new Promise(resolve => setTimeout(resolve, 500)); // Delay to avoid race condition
				if(newConnection.state === signalR.HubConnectionState.Disconnected)
				{
					await newConnection.start();
					
					console.log("Connected to SignalR");
				}else{
					console.error("Current Connection state: ", newConnection.state);
				}
			} catch (error) {
				console.error("Error establishing SignalR connection: ", error);
				setTimeout(startConnection, 3000); 
			}
		};

		startConnection();

		// log connection state changes
		newConnection.onreconnected(() => {
			console.log("Reconnected to SignalR");
		});
		newConnection.onreconnecting((error) => {
			console.log("Reconnecting to SignalR", error);
		});
		newConnection.onclose((error) => {
			console.error("SignalR connection closed: ", error);
		});

    // cleanup connection on component unmount
    return () => {
      newConnection.stop();
    };
  }, []);

	if(!connection){
		return <div>Waiting for connection before rendering...</div>
	}
  
  return (
    <SignalRContext.Provider value={ connection }> 
      { children } 
    </SignalRContext.Provider>
  );
};

export const useSignalR = (): signalR.HubConnection => useContext(SignalRContext);