import { ChatRoom } from 'src/types/ChatRoom.type'
import { Textarea } from 'src/ui/textarea'
import { Button } from 'src/ui/button'
import { LogOut, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getChatRoomName } from 'src/utils/getChatRoomName'
import { useChatStore } from 'src/zustand/chatStore'

const Chatroom = ({ messages }: { messages: ChatRoom[] }) => {
  const { selectedChatroomId } = useChatStore();
  const [chatRoomName, setChatRoomName] = useState('');

  useEffect(() => {
    const name = getChatRoomName(selectedChatroomId);
    setChatRoomName(name);
  }, [selectedChatroomId, messages]);

  return (
    <div>
      <div className="text-lg leading-none bg-[#EAF0F7] pt-4 pb-2 px-4 flex justify-between items-start sticky top-0 z-10">
        <span>{chatRoomName}</span>
        <div className='flex flex-col items-center justify-center'>
          <LogOut className='cursor-pointer' size={15} />
          <span className='text-xs font-thin'>나가기</span>
        </div>
      </div>
      {messages.map((message) => (
        <div className="flex items-start gap-2.5 mb-5 m-5" key={message.message_id}>
          <img className="w-8 h-8 rounded-full" src={message.sender_profile} alt="profile" />
          <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{message.sender_name}</span>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{message.send_time}</span>
            </div>
            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message.message}</p>
          </div>
        </div>
      ))}
      <div className='sticky bottom-0 z-10 bg-white flex flex-row items-center p-5'>
        <Textarea placeholder='메세지를 입력하세요' className='resize-none h-12 mr-3' />
        <Button className='w-14 h-12 p-1 bg-point hover:bg-point-hover active:bg-point-active'><Send color="#ffffff" size={20} /></Button>
      </div>
    </div>
  )
}

export default Chatroom
