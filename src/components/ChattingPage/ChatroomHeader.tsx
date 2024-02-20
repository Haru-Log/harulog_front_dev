import { getChatRoomName } from 'src/utils/getChatRoomName';
import { useChatStore } from 'src/zustand/chatStore';
import { LogOut } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const ChatroomHeader = () => {
  const { chatList, selectedChatroomInfo } = useChatStore();
  const [chatRoomName, setChatRoomName] = useState('');

  useEffect(() => {
    const name = getChatRoomName(chatList, selectedChatroomInfo.roomId);
    setChatRoomName(name);
  }, [selectedChatroomInfo.roomId, chatList]);

  return (
    <div className="text-lg leading-none bg-[#EAF0F7] pt-4 pb-2 px-4 flex justify-between items-start sticky top-0 z-10">
        <span>{chatRoomName}</span>
        <div className='flex flex-col items-center justify-center'>
          <LogOut className='cursor-pointer' size={15} />
          <span className='text-xs font-thin'>나가기</span>
        </div>
      </div>
  )
}

export default ChatroomHeader
