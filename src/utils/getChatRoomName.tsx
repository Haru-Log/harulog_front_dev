import { ChatList, chatUser } from "../types/ChatList.type";

function combineNicknameExceptMe(users: chatUser[], myNickname: string|null) {
  const otherNicknames = users
    .filter(user => user.nickname !== myNickname)
    .map(user => user.nickname);
  const combinedNicknames = otherNicknames.join(', ');
  return combinedNicknames;
}

export const getChatRoomName = (chatList:ChatList[] ,selectedChatroomId: number): string => {
  const myName = localStorage.getItem('nickname');
  const selectedChatRoom = chatList.find(room => room.roomId === selectedChatroomId);
  return selectedChatRoom ? combineNicknameExceptMe(selectedChatRoom.users, myName) : '';
};
