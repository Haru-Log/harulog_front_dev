import { ChatRoom } from 'src/types/ChatRoom.type';

const Chat = ({ message, isSentByCurrentUser }: { message: ChatRoom; isSentByCurrentUser: boolean }) => {
  const messageContainerClass = isSentByCurrentUser ? 'justify-end' : 'justify-start';
  const messageWrapperClass = isSentByCurrentUser ? 'bg-point rounded-s-xl rounded-ee-xl' : 'bg-gray-100 text-gray-900 rounded-e-xl rounded-es-xl';

  return (
    <div className={`flex items-start gap-2.5 mb-2 m-5 flex-1 ${messageContainerClass}`}>
      {!isSentByCurrentUser && <img className="w-8 h-8 rounded-full" src={message.sender_profile} alt="profile" />}
      <div className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 ${messageWrapperClass}`}>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold">{message.sender_name}</span>
            <span className={`text-sm font-normal ${isSentByCurrentUser ? 'text-gray-100' : 'text-gray-500'} `}>{message.send_time}</span>
          </div>
        <p className="text-sm font-normal py-2.5">{message.message}</p>
      </div>
    </div>
  );
};

export default Chat;
