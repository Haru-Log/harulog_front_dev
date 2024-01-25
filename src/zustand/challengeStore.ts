import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ChallengeItem } from '../types/ChallengeItem.type';

interface ChallengeState {
  challenge: ChallengeItem;
  setChallenge: (challenge: ChallengeItem) => void;
}

export const useChallengeStore = create<ChallengeState>()(
  devtools(
    persist(
      (set) => ({
        challenge: {
          challenge_id: 0,
          category_id: 0,
          category_name: '',
          chatroom_id: 0,
          challenge_title: '',
          challenge_content: '',
          challenge_goal: 0,
          challenge_image: '',
          participants: 0,
          submission: '',
          start_date: new Date(),
          end_date: new Date(),
          created_at: new Date(),
          updated_at: undefined,
        },
        setChallenge: (challenge: ChallengeItem) => set({ challenge }),
        
      }),
      { name: 'challengeStore' }
    ),
  ),
);