import React from 'react'

type Props = {}

const ChatInput = (props: Props) => {
  return (
    <div className='fixed bottom-0 left-0 w-full p-6'>
      <form>
        <input 
          className='w-full p-2 rounded-lg outline-none bg-[#0d1826] text-[#e9eef2]'
          type='text'
          placeholder='Type here'
        />
      </form>
    </div>
  )
}

export default ChatInput