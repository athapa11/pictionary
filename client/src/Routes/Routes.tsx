import { createBrowserRouter } from "react-router";
import App from "../App";
import ChatRoom from "../Pages/ChatRoom";
import Login from "../Pages/Login";

export const router = createBrowserRouter(
[{
  path: '/',
  element: <App/>,
  children: [
    {path: '', element: <Login />},
    {path: 'chat', element: <ChatRoom />},
  ]
}]);