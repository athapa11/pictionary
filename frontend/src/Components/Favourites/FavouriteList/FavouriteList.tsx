import React, { SyntheticEvent } from 'react'
import Favourite from '../Favourite/Favourite';

interface Props {
  favourites: string[],
  onFavDelete: (e: SyntheticEvent) => void,
}

const FavouriteList = ({ favourites, onFavDelete }: Props) => {
  return (
    <>
      <h3>Favourited</h3>
      <ul>
        {favourites && favourites.map((favourite) => {
          return <Favourite favourite={favourite} onFavDelete={onFavDelete}/>
        })}
      </ul>
    </>
  )
}

export default FavouriteList;