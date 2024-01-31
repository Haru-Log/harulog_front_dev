import { dummyChatList } from 'src/types/ChatList.dummy'
import React from 'react'
import { Separator } from 'src/ui/seperator'
import getTimeDifference from 'src/utils/getTimeDifference'
import { useChatStore } from 'src/zustand/chatStore'

const MessageList = () => {
  const chatList = dummyChatList
  const {selectChatroom} = useChatStore();

  const handleChatroomClick = (chatroomId:number) => {
    selectChatroom(chatroomId);
    console.log(chatroomId);
  };

  chatList.sort((a, b) => {
    const dateA = new Date(a.last_message);
    const dateB = new Date(b.last_message);
    return dateB.getTime() - dateA.getTime();
  });

  const { selectedChatroomId } = useChatStore();

  return (
    <div>
      {chatList.map(chatList => (
        <div
          className={`cursor-pointer hover:bg-gray-100 ${selectedChatroomId === chatList.chatroom_id ? 'bg-gray-200':''}`}
          key={chatList.chatroom_id}
          onClick={()=>handleChatroomClick(chatList.chatroom_id)}>
          <div className="text-sm py-3 whitespace-nowrap flex flex-row justify-between items-center">
            <div className='flex flex-row justify-start items-center' >
              <img src={chatList.chatroom_profile} alt="Chatroom Profile" className='object-cover rounded-full w-12 h-12 mr-5 ml-3' />
              <span className=''>
                {chatList.chatroom_name.length > 12 ? `${chatList.chatroom_name.slice(0, 12)}...` : chatList.chatroom_name}
              </span>
            </div>
            <span className='text-xs text-gray-400 mx-3'>{getTimeDifference(chatList.last_message)}</span>
          </div>
          <Separator />
        </div>
      ))}
    </div>
  )
}

export default MessageList
