import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { ChatList } from '../types/ChatList.type';
import { ChatRoom } from '../types/ChatRoom.type';

interface ChatState {
  chatList: ChatList[];
  userWillAdded: string[];
  userWillAddedAfter: string[];
  setUserWillAdded: (userWillAdded: string[]) => void;
  setUserWillAddedAfter: (userWillAddedAfter: string[]) => void;
  setChatList: (chatList: ChatList[]) => void;
  selectedChatroomInfo : ChatRoom;
  selectChatroomInfo: (chatroomInfo: ChatRoom) => void;
}

export const useChatStore = create<ChatState>()(
  devtools(
    (set) => ({
      chatList: [],
      userWillAdded: [],
      userWillAddedAfter: [],
      setUserWillAddedAfter: (userWillAddedAfter: string[]) => set({ userWillAddedAfter }),
      setUserWillAdded: (userWillAdded: string[]) => set({ userWillAdded }),
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
