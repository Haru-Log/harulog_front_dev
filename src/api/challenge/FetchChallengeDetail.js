import axios from 'axios';

export const fetchChallengeADetail = async (challengeId) => {
  try {
    const response = await axios.get(`http://localhost:3003/challenge/${challengeId}`);
    console.log('fetching challenge detail: ', response.data.message);
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching challenge detail:', error);
    throw error; 
  }
}