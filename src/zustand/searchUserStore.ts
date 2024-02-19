import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { UserList } from '../types/userList.type';

interface contentState {
  content: string;
  searchToggle: string;
  userList: UserList[];
  currentPage: number;
  totalPage: number;
  setContent: (value: string) => void;
  setSearchToggle: (value: string) => void;
  setUserList: (value: UserList[]) => void;
  setCurrentPage: (value: number) => void;
  setTotalPage: (value: number) => void;
}

export const useContentStore = create<contentState>()(
  devtools(
    (set) => ({
      content: '',
      searchToggle: 'all',
      userList: [],
      currentPage: 0,
      totalPage: 0,
      setContent: (value: string) => set({ content: value }),
      setSearchToggle: (value: string) => set({ searchToggle: value }),
      setUserList: (value: UserList[]) => set({ userList: value }),
      setCurrentPage: (value: number) => set({ currentPage: value }),
      setTotalPage: (value: number) => set({ totalPage: value }),
    }),
    { name: 'SearchUserStore' }
  ),
);

