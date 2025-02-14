interface Props {
  name: string;
  content: string;
}

const ChatBubble = ({ name, content }: Props) => 
{
  return (
    <div className="flex items-start gap-2.5 w-full p-6">
      <div className="flex flex-col w-full leading-1.5">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-[#e9eef2]">{name}</span>
          </div>
          <p className="text-sm font-normal py-2 text-[#e9eef2]">{content}</p>
      </div>
    </div>
  );
};

export default ChatBubble;