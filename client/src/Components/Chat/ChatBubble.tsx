interface Props {
  name: string;
  content: string;
}

const ChatBubble = ({ name, content }: Props) => 
{
  return (
    <div className="flex items-start gap-2.5 w-full p-1 mb-1 bg-white rounded-lg">
      <div className="flex flex-col w-full leading-1.5 text-[#0e1115]">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold">{name}:</span>
              <p className="text-sm font-normal py-1">{content}</p>
          </div>
          
      </div>
    </div>
  );
};

export default ChatBubble;