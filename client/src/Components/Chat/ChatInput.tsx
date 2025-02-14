import { ChangeEvent, SyntheticEvent } from 'react';

interface Props {
  guess: string,
  onGuessSubmit: (e:SyntheticEvent) => void,
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
}


const ChatInput = ({ guess, onGuessSubmit, onInputChange }: Props) => {
  return (
    <div className='w-full'>
      <form onSubmit={onGuessSubmit}>
        <input 
          className='w-full p-2 rounded-lg outline-none bg-[#0d1826] text-[#e9eef2]' 
          value={guess} 
          type='text' 
          placeholder='Type here'
          onChange={onInputChange}
        />
      </form>
    </div>
  );
};

export default ChatInput;