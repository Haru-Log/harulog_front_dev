import { dummyChatList } from "../types/ChatList.dummy";

export const getChatRoomName = (selectedChatroomId: number): string => {
  const selectedChatRoom = dummyChatList.find(room => room.chatroom_id === selectedChatroomId);
  return selectedChatRoom ? selectedChatRoom.chatroom_name : '';
};
