export interface ChallengeDetail {
  challengeId: number,
  challengeTitle: string,
  challengeContent: string,
  challengeGoal: number,
  submission: string,
  imageUrl: string,
  startDate: string,
  endDate: string,
  categoryName: string,
  chatRoomId: string,
  challengeUserList: [
    {
      userId: number,
      nickname: string,
      imageUrl: string,
      role: string,
      status: string,
      dailyAchievement: boolean,
    },
  ],
  challengeLeader: boolean,
  participate: boolean,
}