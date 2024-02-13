import convertDateFormat from '@/src/utils/convertDateFormat';
import axios from 'axios';

export const createChallenge = async (challenge) => {
  try {
    const response = await axios.post('https://k43884eb26cf9a.user-app.krampoline.com/api/challenge/regist', {
      challengeTitle : challenge.challengeTitle,
      challengeContent : challenge.challengeContent,
      challengeGoal : challenge.challengeGoal,
      submission : challenge.submission,
      startDate : convertDateFormat(challenge.startDate),
      endDate : convertDateFormat(challenge.endDate),
      categoryName : challenge.categoryName,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating challenge:', error);
    throw error; 
  }
}