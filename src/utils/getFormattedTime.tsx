export const getFormattedTime = (challengeGoal: number): string => {
  const hour = Math.floor(challengeGoal / 60);
  const minute = challengeGoal % 60;
  return `${hour.toString().padStart(2, '0')}:${minute
    .toString()
    .padStart(2, '0')}`;
};
