import React, { SyntheticEvent } from 'react'

interface Props {
  favourite: string,
  onFavDelete: (e: SyntheticEvent) => void,
}

const DeleteFavourite = ({favourite, onFavDelete}: Props) => {
  return (
    <div>
      <form onSubmit={onFavDelete}>
        <input hidden={true} value={favourite}/>
        <button> x </button>
      </form>
    </div>
  )
}

export default DeleteFavourite