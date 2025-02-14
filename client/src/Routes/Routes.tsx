import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home";
import Draw from "../Containers/Draw";
import Chat from "../Containers/Chat";
import Room from "../Pages/Room";

export const router = createBrowserRouter(
[{
  path: '/',
  element: <App/>,
  children: [
    {path: '', element: <Home />},
    {path: 'chat', element: <Chat />},
    {path: 'draw', element: <Draw/>},
    {path: 'room', element: <Room/>},
  ]
}]);