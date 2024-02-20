import React, { useEffect } from 'react'
import { Separator } from 'src/ui/seperator'
import getTimeDifference from 'src/utils/getTimeDifference'
import { useChatStore } from 'src/zustand/chatStore'
import { fetchChatsList } from 'src/api/chats/FetchChatsList'
import { getChatRoomName } from 'src/utils/getChatRoomName'
import { enterChatRoom } from 'src/api/chats/EnterChatRoom'

const MessageList = () => {
  const {chatList, setChatList, selectedChatroomInfo, selectChatroomInfo} = useChatStore();

  const handleChatroomClick = async(chatroomId:string) => {
    try {
      const response = await enterChatRoom(chatroomId);
      selectChatroomInfo(response.data)
    }
    catch (error) {
      console.error(error);
    }
    console.log(chatroomId);
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetchChatsList();
        setChatList(response);
      }
      catch (error) {
        console.error(error);
      }
    }
    fetchChats();
  }, [setChatList]);
  console.log(chatList);

  const truncateChatroomName = (name:string, maxLength:number) => {
    return name && name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
  };
  
  return (
    <div>
      {chatList && chatList.map((chats, index) => (
        <div
          className={`cursor-pointer hover:bg-gray-100 ${selectedChatroomInfo.roomId === chats.roomId ? 'bg-gray-200':''}`}
          key={index}
          onClick={()=>handleChatroomClick(chats.roomId)}>
          <div className="text-sm py-3 whitespace-nowrap flex flex-row justify-between items-center">
            <div className='flex flex-row justify-start items-center' >
              <img src={'chatList.chatroom_profile'} alt="Chatroom Profile" className='object-cover rounded-full w-12 h-12 mr-5 ml-3' />
              <span className=''>
                {truncateChatroomName(getChatRoomName(chatList, chats.roomId), 20)}
              </span>
            </div>
            <span className='text-xs text-gray-400 mx-3'>{getTimeDifference(chats.updatedAt)}</span>
          </div>
          <Separator />
        </div>
      ))}
    </div>
  )
}

export default MessageList
