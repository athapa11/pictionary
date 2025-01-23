import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:5043/hub") // Replace with your backend URL
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

export const startConnection = async (): Promise<void> => {
    try {
        await connection.start();
        console.log("SignalR connection established.");
    } catch (error) {
        console.error("Error establishing SignalR connection: ", error);
        setTimeout(() => startConnection(), 5000); // Retry after 5 seconds
    }
};

export const sendMessage = async (user: string, message: string): Promise<void> => {
    try {
        await connection.invoke("SendMessage", user, message);
    } catch (error) {
        console.error("Error sending message: ", error);
    }
};

export const onReceiveMessage = (callback: (user: string, message: string) => void): void => {
    connection.on("ReceiveMessage", callback);
};
