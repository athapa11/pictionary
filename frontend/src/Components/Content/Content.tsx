import React, { SyntheticEvent } from 'react'
import { ModelSearchList } from '../../models';
import AddFavourite from '../Favourites/AddFavourite/AddFavourite';

interface Props 
{
  searchResult: ModelSearchList,
  onFavouriteCreate: (e: SyntheticEvent) => void,
};

const Content = ({ searchResult, onFavouriteCreate }: Props) => {
  return (
    <div className='flex flex-col items-start w-full p-6 rounded-lg space-y-2'>
      <img src={searchResult.thumbnails?.images?.[0]?.url} alt=""/>
      <div className='description'>
        <p>{searchResult.name}</p>
      </div>
      { searchResult.uid && <AddFavourite id={searchResult.uid} onCreate={onFavouriteCreate}/> }
    </div>
  )
};

export default Content;