import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ChallengeAll } from '../types/ChallengeAll.type';

interface ChallengeState {
  challenge: ChallengeAll[];
  setChallenge: (challenge: ChallengeAll[]) => void;
}

export const useChallengeAllStore = create<ChallengeState>()(
  devtools(
    (set) => ({
      challenge: [],
      setChallenge: (challenge: ChallengeAll[]) => set({ challenge }),

    }),
    { name: 'ChallengeAllStore' }
  ),
);