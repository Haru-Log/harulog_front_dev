import React from 'react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../ui/resizable-panel'
import { ScrollArea } from '../ui/scroll-area'
import MessageListHeader from '../components/ChattingPage/MessageListHeader'
import MessageList from '../components/ChattingPage/MessageList'
import Chatroom from '../components/ChattingPage/Chatroom'
import { useChatStore } from '../zustand/chatStore'
import { Messages } from '../types/ChatRoom.type'

const ChattingPage = () => {
  const { selectedChatroomInfo } = useChatStore();
  const selectedMessages: Messages[] = selectedChatroomInfo?.messages ?? [];

  return (
    <div className='mt-12 font-ibm'>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-fit border-b"
      >
        <ResizablePanel defaultSize={20} className='min-w-[300px] max-w-[500px] h-full'>
          <ScrollArea className="h-[1000px]">
            <MessageListHeader />
            <MessageList />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <ScrollArea className="h-[1000px]">
            {selectedChatroomInfo.roomId !=='' ? <Chatroom messages={selectedMessages} /> : <div className='bg-[#EAF0F7] h-[1000px] flex items-center justify-center'><div>채팅방을 선택해보세요!</div></div>}
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default ChattingPage
