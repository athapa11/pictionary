import React, { ChangeEvent, SyntheticEvent } from 'react';

interface Props 
{
	search: string,
	onSearchSubmit: (e: SyntheticEvent) => void,
	handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
};

const Search = ({search, onSearchSubmit, handleSearchChange}: Props) => 
{
	return(
		<div className="max-w-4x1 mx-auto p-6 space-y-6">
			<form className="form relative flex flex-col w-full p-10 space-y-4 rounded-lg md:flex-row md:space-y-0 md:space-x-3"
				onSubmit={onSearchSubmit}>
				<input className="flex-1 p-3 border-2 rounded-lg focus:outline-none plceholder-black !bg-white !text-black" 
					value={search} 
					onChange={handleSearchChange}
					placeholder='Search for 3D models'
				/>
			</form>
		</div>
	)
};

export default Search;