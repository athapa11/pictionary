import React, { useState } from 'react'
import FavouriteList from '../Components/Favourites/FavouriteList/FavouriteList'

interface Props {}

const FavouritesPage = (props: Props) => 
  {
  const [favourites, setFavourites] = useState<string[]>([]);
  
  const onFavDelete = (e: any) => {
    e.preventDefault();
    const removed = favourites.filter((value) => {
      return value !== e.target[0].value;
    });
    setFavourites(removed);
  };
  
  return (
    <div>
      <FavouriteList favourites={favourites} onFavDelete={onFavDelete}/>
    </div>
  )
}

export default FavouritesPage