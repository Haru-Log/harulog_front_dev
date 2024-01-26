import { SquarePen } from 'lucide-react'
import React from 'react'

const MessageListHeader = () => {
  return (
    <div className="text-lg font-bold leading-none bg-point pt-4 pb-2 px-4 flex justify-between items-start">
    <span>메세지</span>
    <div className='flex flex-col items-center justify-center'>
      <SquarePen className='cursor-pointer' size={15} />
      <span className='text-xs font-thin'>요청</span>
    </div>
  </div>
  )
}

export default MessageListHeader
