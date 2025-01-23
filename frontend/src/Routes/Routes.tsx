import { createBrowserRouter } from "react-router";
import App from "../App";
import FavouritesPage from "../Pages/FavouritesPage";
import View from "../Components/View/View";
import ChatRoom from "../Components/Chat/ChatRoom";
import LoginPage from "../Pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {path: '', element: <LoginPage />},
      {path: 'chat', element: <ChatRoom />},
      {path: 'favourites', element: <FavouritesPage/>},
      {path: 'viewer', element: <View/>},
    ]
  }
]);