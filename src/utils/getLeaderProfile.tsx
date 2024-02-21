import { fetchImgFromFirebase } from "../api/fetchImgFirebase";
import { ChallengeDetail } from '../types/ChallengeDetail.type'

const getLeaderProfile = async (challenge: ChallengeDetail): Promise<string> => {
  const leaderUser = challenge.challengeUserList.find(user => user.role === "LEADER");
  const img = await fetchImgFromFirebase(leaderUser?.imageUrl);
  if (img) {
    return img
  } else {
    return ""
  }
}
export default getLeaderProfile