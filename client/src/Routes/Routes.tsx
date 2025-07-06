import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home";
import Room from "../Pages/Room";

export const router = createBrowserRouter(
[{
  path: '/',
  element: <App/>,
  children: [
    { path: '', element: <Home/> },
    { path: 'room', element: <Room/> }
  ]
}]);