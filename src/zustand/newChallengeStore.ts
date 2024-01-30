import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ChallengeItem } from '../types/ChallengeItem.type';

interface newChallengeState {
  newChallenge: ChallengeItem;
  setNewChallenge: (newChallenge: ChallengeItem) => void;
}

export const useChallengeStore = create<newChallengeState>()(
  devtools(
    (set) => ({
      newChallenge: {
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
      setNewChallenge: (newChallenge: ChallengeItem) => set({ newChallenge }),
    }),
    { name: 'newChallengeStore' }
  ),
);