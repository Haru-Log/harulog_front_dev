import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ChallengeDetail } from '../types/ChallengeDetail.type';

interface newChallengeState {
  newChallenge: ChallengeDetail;
  setNewChallenge: (newChallenge: ChallengeDetail) => void;
}

export const useNewChallengeStore = create<newChallengeState>()(
  devtools(
    (set) => ({
      newChallenge: {
        challengeId: 0,
        challengeTitle: '',
        challengeContent: '',
        challengeGoal: 0,
        submission: '',
        imageUrl: '',
        startDate: '',
        endDate: '',
        categoryName: '',
        chatRoomId: '',
        challengeUserList: [
          {
            userId: 0,
            nickname: '',
            imageUrl: '',
            role: '',
            status: '',
            dailyAchievement: false,
          },
        ],
        challengeLeader: false,
        participate: false,
      },
      setNewChallenge: (newChallenge: ChallengeDetail) => set({ newChallenge }),
    }),
    { name: 'newChallengeStore' }
  ),
);