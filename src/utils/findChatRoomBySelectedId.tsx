import { dummyChatRoom } from "../types/ChatRoom.dummy";
import { ChatRoom } from "../types/ChatRoom.type";

export function findChatRoomBySelectedId(selectedChatroomId: number): ChatRoom[] {
  const selectedChatRooms: ChatRoom[] = Object.values(dummyChatRoom)
    .flatMap(chatRooms => chatRooms.filter((room: { chatroom_id: number; }) => room.chatroom_id === selectedChatroomId));

  return selectedChatRooms;
}