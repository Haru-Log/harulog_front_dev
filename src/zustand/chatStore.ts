import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface ChatState {
  selectedChatroomId: number;
  selectChatroom: (chatroomId: number) => void;
}

export const useChatStore = create<ChatState>()(
  devtools(
    (set) => ({
      selectedChatroomId: 0,
      selectChatroom: (selectedChatroomId: number) => set({ selectedChatroomId }),
    }),
    { name: 'chatStore' }
  ),
);
