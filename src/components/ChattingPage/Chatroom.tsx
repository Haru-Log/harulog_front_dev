import { Messages } from 'src/types/ChatRoom.type'
import { Textarea } from 'src/ui/textarea'
import { Button } from 'src/ui/button'
import { Send } from 'lucide-react'
import Chat from './Chat'
import ChatroomHeader from './ChatroomHeader'

const Chatroom = ({ messages }: { messages: Messages[] }) => {

  return (
    <div className='h-[1000px] flex flex-col'>
      <ChatroomHeader />
      <div className='flex-1'>
        {messages.map((message, index) => (
          <Chat
            message={message}
            key={index}
            isSentByCurrentUser={message.senderName === '사용자'}
          />
        ))}
      </div>
      <div className='sticky bottom-0 z-10 bg-white flex flex-row items-center p-5 '>
        <Textarea placeholder='메세지를 입력하세요' className='resize-none h-12 mr-3' />
        <Button className='w-14 h-12 p-1 bg-point hover:bg-point-hover active:bg-point-active'><Send color="#ffffff" size={20} /></Button>
      </div>
    </div>
  )
}

export default Chatroom
