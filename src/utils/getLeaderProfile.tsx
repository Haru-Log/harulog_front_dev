import { ChallengeDetail } from '../types/ChallengeDetail.type'

const getLeaderProfile = (challenge: ChallengeDetail): string | undefined => {
  const leaderUser = challenge.challengeUserList.find(user => user.role === "LEADER");

  return leaderUser?.imageUrl; 
}
export default getLeaderProfile