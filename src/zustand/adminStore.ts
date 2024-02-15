import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { UserList } from '../types/userList.type';
import { FeedList } from '../types/FeedList.type';

interface adminState {
  toggle: string;
  userList: UserList[];
  feedList: FeedList[];
  currentFeedPage: number;
  totalFeedPage: number;
  currentUserPage: number;
  totalUserPage: number;
  setToggle: (value: string) => void;
  setUserList: (value: UserList[]) => void;
  setFeedList: (value: FeedList[]) => void;
  setCurrentFeedPage: (value: number) => void;
  setTotalFeedPage: (value: number) => void;
  setCurrentUserPage: (value: number) => void;
  setTotalUserPage: (value: number) => void;
}

export const useAdminStore = create<adminState>()(
  devtools(
    (set) => ({
      toggle: 'posts',
      userList: [],
      feedList: [],
      currentFeedPage: 0,
      totalFeedPage: 0,
      currentUserPage: 0,
      totalUserPage: 0,
      setToggle: (value: string) => set({ toggle: value }),
      setUserList: (value: UserList[]) => set({ userList: value }),
      setFeedList: (value: FeedList[]) => set({ feedList: value }),
      setCurrentFeedPage: (value: number) => set({ currentFeedPage: value }),
      setTotalFeedPage: (value: number) => set({ totalFeedPage: value }),
      setCurrentUserPage: (value: number) => set({ currentUserPage: value }),
      setTotalUserPage: (value: number) => set({ totalUserPage: value }),
    }),
    { name: 'adminStore' }
  ),
);

