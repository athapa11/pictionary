import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { searchModels } from '../APIs/SketchfabApi';
import Search from '../Components/Search/Search';
import ContentList from '../Components/ContentList/ContentList';
import { ModelSearchList } from '../models';

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<ModelSearchList[]>([]);
  const [serverError, setServerError] = useState<string>("");
  const [favourites, setFavourites] = useState<string[]>([]);


	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		console.log(e);
	};


	const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
		const result = await searchModels(search);
    console.log("full api response structure: ", result);

    if(typeof result === "string"){
      setServerError(result);
    }
    else if(Array.isArray(result.data.results)){
      setSearchResult(result.data.results);
      console.log("Result is an array:", result.data.results);
    }
    else {
      console.error("Unexpected result type:", typeof result.data.results, result.data.results);
    }
	};


  // debug
  useEffect(() => {
    console.log("searchResult: ", searchResult);
  }, [searchResult]);

  useEffect(() => {
    document.documentElement.classList.add('dark'); // This will force dark mode globally
  }, []);  


  const onFavouriteCreate = (e: any) => {
    // validation
    e.preventDefault();
    const exists = favourites.find((value) => value === e.target[0].value);
    if(exists) return;

    const updatedFavourites = [...favourites, e.target[0].value];
    setFavourites(updatedFavourites);
  };

  
  return (
    <div className="min-h-screen dark:bg-[#0d1826] dark:text-white">
      <Search search={search} onSearchSubmit={onSearchSubmit} handleSearchChange={handleSearchChange} />
      {serverError && <h1></h1>}
      <ContentList searchResults={searchResult} onFavouriteCreate={onFavouriteCreate}/>
    </div>
  );
}

export default SearchPage