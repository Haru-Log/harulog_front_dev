import { useChatStore } from '../zustand/chatStore';

const GetUsersInThisChatBySelectedRoomId = () => {
  const { chatList, selectedChatroomInfo } = useChatStore();
  const selectedChat = chatList.find(chat => chat.roomId === selectedChatroomInfo.roomId);
  const usersInSelectedChat = selectedChat ? selectedChat.users.map(user => user.nickname) : [];

  return usersInSelectedChat
}

export default GetUsersInThisChatBySelectedRoomId
