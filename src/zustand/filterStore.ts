import create from 'zustand';

interface FilterState {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedValue: '전체',
  setSelectedValue: (value: string) => set({ selectedValue: value }),
}));
