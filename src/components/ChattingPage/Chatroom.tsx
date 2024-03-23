import { Send } from 'lucide-react';
import Chat from './Chat';
import ChatroomHeader from './ChatroomHeader';
import ShowPrevMessage from './ShowPrevMessage';
import { useEffect, useRef, useState } from 'react';
import { CompatClient } from '@stomp/stompjs';
import { useChatStore } from '@/zustand/chatStore';
import { Textarea } from '@/ui/textarea';
import { Button } from '@/ui/button';
interface ChatroomProps {
  stompClient: CompatClient | undefined;
}
const Chatroom: React.FC<ChatroomProps> = ({ stompClient }) => {
  const { selectedChatroomInfo } = useChatStore();
  const [messageInput, setMessageInput] = useState('');
  const myName = localStorage.getItem('nickname');

  const sendMessage = async () => {
    if (!stompClient || !stompClient.connected) {
      console.error('Stomp client is not available');
      return;
    }
    const destination = `/app/chat/${selectedChatroomInfo.roomId}/send`;
    const message = {
      sender: myName,
      messageType: 'TALK',
      content: messageInput,
    };

    stompClient.send(
      destination,
      { 'content-type': 'application/json' },
      JSON.stringify(message)
    );
    setMessageInput('');
  };

  const messageEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChatroomInfo]);

  return (
    <div className="h-[1000px] flex flex-col">
      <ChatroomHeader />
      <div className="flex-1">
        <ShowPrevMessage />
        {selectedChatroomInfo.messages.length &&
          selectedChatroomInfo.messages.map((message) => (
            <Chat
              message={message}
              key={message.messageId}
              isSentByCurrentUser={message.senderName === myName}
            />
          ))}
        <div ref={messageEndRef} />
      </div>
      <div className="sticky bottom-0 bg-white flex flex-row items-center p-5 ">
        <Textarea
          placeholder="메세지를 입력하세요"
          className="resize-none h-12 mr-3"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <Button
          className="w-14 h-12 p-1 bg-point hover:bg-point-hover active:bg-point-active"
          onClick={sendMessage}
          disabled={!messageInput}
        >
          <Send color="#ffffff" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Chatroom;
