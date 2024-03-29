import { Separator } from 'src/ui/seperator'
import getTimeDifference from 'src/utils/getTimeDifference'
import { useChatStore } from 'src/zustand/chatStore'
import { getChatRoomName } from 'src/utils/getChatRoomName'
import { enterChatRoom } from 'src/api/chats/EnterChatRoom'
import { outChatRoom } from 'src/api/chats/OutChatRoom'
import MessageListImage from './MessageListImage'

const MessageList = () => {
  const { chatList, selectedChatroomInfo, selectChatroomInfo } = useChatStore();

  const handleChatroomClick = async (chatroomId: string) => {
    try {
      if (selectedChatroomInfo.roomId) {
        await outChatRoom(selectedChatroomInfo.roomId);
        console.log("나간 채팅방: ", selectedChatroomInfo.roomId)
      }
      const response = await enterChatRoom(chatroomId);
      selectChatroomInfo(response)
      console.log("selectedChatroomInfo: ", selectedChatroomInfo);
    }
    catch (error) {
      console.error(error);
    }
    console.log(chatroomId);
  };

  console.log("chatList: ", chatList);

  const truncateChatroomName = (name: string, maxLength: number) => {
    return name && name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
  };
  
  

  return (
    <div>
      {chatList && chatList.map((chats, index) => (
        <div
          className={`cursor-pointer hover:bg-gray-100 ${selectedChatroomInfo.roomId === chats.roomId ? 'bg-gray-200' : ''}`}
          // className={`cursor-pointer hover:bg-gray-100 `}
          key={index}
          onClick={() => handleChatroomClick(chats.roomId)}>
          <div className="text-sm py-3 whitespace-nowrap flex flex-row justify-between items-center">
            <div className='flex flex-row justify-start items-center' >
              <div className="relative">
              <MessageListImage roomType={chats.roomType} imgUrl={chats.users[0].profileImage} />
                <div>{chats.unreadCount > 0 && (
                  <div className="absolute top-0 right-1">
                    <div className="bg-[#ff7676] w-4 h-4 rounded-full flex justify-center items-center">
                      <span className="text-white text-[11px]">{chats.unreadCount}</span>
                    </div>
                  </div>
                )}
                </div>
              </div>
              <span>
                {truncateChatroomName(getChatRoomName(chatList, chats.roomId), 20)}
              </span>
            </div>
            <span className='text-xs text-gray-400 mx-3'>{getTimeDifference(chats.updatedAt)}</span>
          </div>
          <Separator />
        </div>
      ))}
      {chatList.length === 0 && <span className='h-[1000px] flex items-center justify-center'>참여중인 채팅방이 없습니다.</span>}
    </div>
  )
}

export default MessageList
