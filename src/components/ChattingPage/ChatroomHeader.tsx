import { LogOut } from 'lucide-react'
import React from 'react'

const ChatroomHeader = () => {
  return (
    <div className="text-lg leading-none bg-[#EAF0F7] pt-4 pb-2 px-4 flex justify-between items-start">
      <span>선택된 채팅방</span>
      <div className='flex flex-col items-center justify-center'>
        <LogOut className='cursor-pointer' size={15} />
        <span className='text-xs font-thin'>나가기</span>
      </div>
    </div>
  )
}

export default ChatroomHeader
