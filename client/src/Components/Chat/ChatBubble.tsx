interface Props {
  username: string,
  time: string,
  content: string,
  isDelivered: boolean,
  avatar: string,
}

const ChatBubble = ({username, time, content, isDelivered, avatar}: Props) => {
  
  return (
    <div className="flex items-start gap-2.5 w-full p-6">
      <img className="w-8 h-8 rounded-full" src={avatar} alt="avatar"/>
      <div className="flex flex-col w-full leading-1.5">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-[#e9eef2]">{username}</span>
              <span className="text-sm font-normal text-gray-500">{time}</span>
          </div>
          <p className="text-sm font-normal py-2 text-[#e9eef2]">{content}</p>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{isDelivered ? 'Delivered' : 'Sending'}</span>
      </div>
    </div>
  )
}

export default ChatBubble