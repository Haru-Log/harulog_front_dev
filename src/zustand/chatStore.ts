import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { ChatList } from '../types/ChatList.type';

interface ChatState {
  chatList: ChatList[];
  setChatList: (chatList: ChatList[]) => void;
  selectedChatroomId: number;
  selectChatroom: (chatroomId: number) => void;
}

export const useChatStore = create<ChatState>()(
  devtools(
    (set) => ({
      chatList: [],
      setChatList: (chatList: ChatList[]) => set({ chatList }),
      selectedChatroomId: 0,
      selectChatroom: (selectedChatroomId: number) => set({ selectedChatroomId }),
    }),
    { name: 'chatStore' }
  ),
);
