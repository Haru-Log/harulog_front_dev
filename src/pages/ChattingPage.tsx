import React from 'react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../ui/resizable-panel'
import { ScrollArea } from '../ui/scroll-area'
import MessageListHeader from '../components/ChattingPage/MessageListHeader'
import MessageList from '../components/ChattingPage/MessageList'
import ChatroomHeader from '../components/ChattingPage/ChatroomHeader'
import Chatroom from '../components/ChattingPage/Chatroom'

const ChattingPage = () => {
  return (
    <div className='mt-12'>
      <ResizablePanelGroup
        direction="horizontal"
        className="max-h-[1000px] border-b"
      >
        <ResizablePanel className='w-[230px] min-w-[180px] max-w-[400px] h-full'>
          <ScrollArea className="h-[1000px]">
            <MessageListHeader />
            <MessageList />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <ScrollArea className="h-[1000px]">
            <ChatroomHeader />
            <Chatroom />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default ChattingPage
