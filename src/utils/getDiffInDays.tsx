import { ChallengeDetail } from '../types/ChallengeDetail.type';

const getDiffInDays = (challenge: ChallengeDetail): string => {
  const currentDate = new Date();
  const startDate = new Date(challenge.startDate!);
  const endDate = new Date(challenge.endDate!);

  if (currentDate < startDate) {
    const daysRemaining = Math.ceil(
      (startDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
    );
    return `${daysRemaining}일 뒤 시작 🌤️`;
  } else if (currentDate >= startDate && currentDate <= endDate) {
    const daysPassed = Math.floor(
      (currentDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    );
    return `${daysPassed + 1}일차 🚀`;
  } else {
    return '종료 😌';
  }
};

export default getDiffInDays;
