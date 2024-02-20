import { ChatList, chatUser } from "../types/ChatList.type";

function combineNicknameExceptMe(users: chatUser[], myNickname: string|null) {
  const otherNicknames = users
    .filter(user => user.nickname !== myNickname)
    .map(user => user.nickname);
  const combinedNicknames = otherNicknames.join(', ');
  return combinedNicknames;
}

export const getChatRoomName = (chatList:ChatList[] ,selectedChatroomId: string): string => {
  const myName = localStorage.getItem('nickname');
  const selectedChatRoom = chatList.find(room => room.roomId === selectedChatroomId);
  if (selectedChatRoom && selectedChatRoom.roomType === "CHALLENGE")
    return "[챌린지] "+selectedChatRoom.challengeName;
  else
    return selectedChatRoom ? combineNicknameExceptMe(selectedChatRoom.users, myName) : '';
};
