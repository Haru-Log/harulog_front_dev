import { ChatList, chatUser } from "../types/ChatList.type";
import { useChatStore } from "../zustand/chatStore";

function combineNicknameExceptMe(users: chatUser[], myNickname: string|null) {
  const otherNicknames = users
    .filter(user => user.nickname !== myNickname)
    .map(user => user.nickname);
  const combinedNicknames = otherNicknames.join(', ');
  return combinedNicknames;
}

export const getChatRoomName = (chatList:ChatList[] ,selectedChatroomId: number): string => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const myName = localStorage.getItem('nickname');
  const selectedChatRoom = chatList.find(room => room.roomId === selectedChatroomId);
  return selectedChatRoom ? combineNicknameExceptMe(selectedChatRoom.users, myName) : '';
};
