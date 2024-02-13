import axios from 'axios';

export const fetchChallengeProfile = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}api/profile/challenge`);
    console.log('fetching all challenges: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching all challenges:', error);
    throw error; 
  }
}