import React, { SyntheticEvent } from 'react';
import { ModelSearchList } from '../../models';
import Content from '../Content/Content';
import { v4 as uuidv4 } from 'uuid';

interface Props {
	searchResults: ModelSearchList[],
	onFavouriteCreate: (e: SyntheticEvent) => void,
};

const ContentList = ({ searchResults, onFavouriteCreate }: Props) => {
	return (
		<>
			{searchResults.length > 0 ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-6'>
				{searchResults.map((result) => {
					return <Content key={uuidv4()} searchResult={result} onFavouriteCreate={onFavouriteCreate}/>
				})}
				</div>
			) : (
				<p className='mb-3 mt-3 text-xl font-semibold text-center md:text-xl'>
          No results
        </p>
			)}
		</>
	)
};

export default ContentList;