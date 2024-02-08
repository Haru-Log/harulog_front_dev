import axios from 'axios';

export const fetchChallengeAll = async () => {
  try {
    const response = await axios.get('http://localhost:3003/challenge');
    console.log('fetching all challenges: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching all challenges:', error);
    throw error; 
  }
}