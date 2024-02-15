import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ChallengeDetail } from '../types/ChallengeDetail.type';

interface ChallengeState {
  challenge: ChallengeDetail;
  setChallenge: (challenge: ChallengeDetail) => void;
}

export const useChallengeDetailStore = create<ChallengeState>()(
  devtools(
    (set) => ({
      challenge: {
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
      setChallenge: (challenge: ChallengeDetail) => set({ challenge }),

    }),
    { name: 'challengeDetailStore' }
  ),
);