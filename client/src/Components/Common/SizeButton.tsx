import { MouseEventHandler } from 'react';

interface Props {
  src: string,
  onClick: MouseEventHandler<HTMLButtonElement>,
  size: number,
}

const SizeButton = ({src, onClick, size}: Props) => {
  return (
    <button 
      className='bg-[#e9eef2] hover:bg-blue-500 p-0.5 rounded w-10 h-10 flex items-center justify-center'
      onClick={onClick}
    >
      <img 
        className='object-contain'
        style={{width: size*4, height: size*4}}
        src={src}
      />
    </button>
  );
};

export default SizeButton;