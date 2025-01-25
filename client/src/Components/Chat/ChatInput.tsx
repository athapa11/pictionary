import { ChangeEvent, SyntheticEvent } from 'react'

interface Props {
  message: string,
  onMessageSubmit: (e:SyntheticEvent) => void,
  onMessageChange: (e: ChangeEvent<HTMLInputElement>) => void,
}


const ChatInput = ({ message, onMessageSubmit, onMessageChange }: Props) => {
  return (
    <div className='w-full p-6'>
      <form onSubmit={onMessageSubmit}>
        <input 
          className='w-full p-2 rounded-lg outline-none bg-[#0d1826] text-[#e9eef2]' 
          value={message} 
          type='text' 
          placeholder='Type here'
          onChange={onMessageChange}
        />
      </form>
    </div>
  )
}

export default ChatInput