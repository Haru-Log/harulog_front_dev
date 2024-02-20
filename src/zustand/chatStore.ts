import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { ChatList } from '../types/ChatList.type';
import { ChatRoom } from '../types/ChatRoom.type';

interface ChatState {
  chatList: ChatList[];
  setChatList: (chatList: ChatList[]) => void;
  selectedChatroomInfo : ChatRoom;
  selectChatroomInfo: (chatroomInfo: ChatRoom) => void;
}

export const useChatStore = create<ChatState>()(
  devtools(
    (set) => ({
      chatList: [],
      setChatList: (chatList: ChatList[]) => set({ chatList }),
      selectedChatroomInfo: {
        roomId: '',
        userCount: 0,
        messages: [],
      },
      selectChatroomInfo: (selectedChatroomInfo: ChatRoom) => set({ selectedChatroomInfo }),
    }),
    { name: 'chatStore' }
  ),
);
