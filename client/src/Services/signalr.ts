import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5043/hub", {withCredentials: true})
  .withAutomaticReconnect()
  .build();

export const startConnection = async (): Promise<void> => 
{
  try {
    if(connection.state === "Disconnected")
    {
      await connection.start();
      console.log("Connected to SignalR");
    }
    else{
      console.log("Connection state:", connection.state);
    }
  } catch (error) {
    console.error("Error establishing SignalR connection: ", error);
    setTimeout(startConnection, 10000); // Retry after 5 seconds
  }
};

export const sendMessage = async (user: string, message: string): Promise<void> => {
  try {
    await connection.invoke("SendMessage", user, message);
  } catch (error) {
    console.error("Error sending message: ", error);
  }
};

// listener
export const onReceiveMessage = (callback: (user: string, message: string) => void): void => {
  connection.on("ReceiveMessage", callback);
};

// turn listener off
export const onReceiveMessageOff = (callback: (user: string, message: string) => void): void => {
  connection.off("ReceiveMessage", callback);
};