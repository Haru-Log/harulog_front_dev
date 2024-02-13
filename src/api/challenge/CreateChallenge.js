import convertDateFormat from '@/src/utils/convertDateFormat';
import axios from 'axios';

export const createChallenge = async (challenge) => {
  try {
    const response = await axios.post('http://localhost:3003/challenge/regist', {
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