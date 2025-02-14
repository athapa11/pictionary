import React, { MouseEventHandler } from 'react';

interface Props {
  src: string,
  onClick: MouseEventHandler<HTMLButtonElement>,
}

const ToolButton = ({src, onClick}: Props) => {
  return (
    <button 
        className='bg-[#e9eef2] hover:bg-blue-500 rounded p-1 w-10 h-10'
        onClick={onClick}
      >
        <img className='w-8 h-8' src={src}/>
    </button>
  );
};

export default ToolButton;