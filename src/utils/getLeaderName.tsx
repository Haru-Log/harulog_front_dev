import { ChallengeDetail } from '../types/ChallengeDetail.type'

const getLeaderName = (challenge: ChallengeDetail): string | undefined => {
  const leaderUser = challenge.challengeUserList.find(user => user.role === "LEADER");

  return leaderUser?.nickname; 
}
export default getLeaderName
