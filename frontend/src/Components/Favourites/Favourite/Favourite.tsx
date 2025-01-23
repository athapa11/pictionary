import React, { SyntheticEvent } from 'react'
import DeleteFavourite from '../DeleteFavourite/DeleteFavourite';

interface Props{
  favourite: string,
  onFavDelete: (e: SyntheticEvent) => void,
}

const Favourite = ({ favourite, onFavDelete }: Props) => {
  return (
    <>
      <h4>{favourite}</h4>
      <DeleteFavourite favourite={favourite} onFavDelete={onFavDelete}/>
    </>
  )
};

export default Favourite;