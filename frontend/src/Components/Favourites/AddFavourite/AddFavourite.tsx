import React, { SyntheticEvent } from 'react';

interface Props {
  onCreate: (e: SyntheticEvent) => void,
  id: string,
}

const AddFavourite = ({ id, onCreate }: Props) => {
  return (
    <form onSubmit={ onCreate }>
      <input readOnly={true} hidden={true} value={id}/>
      <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full text-xs'
        type="submit"
      > 
        Add 
      </button>
    </form>
  )
};

export default AddFavourite;