import axios from 'axios';

export const fetchChallengeProfile = async () => {
  try {
    const response = await axios.get('https://k43884eb26cf9a.user-app.krampoline.com/api/profile/challenge');
    console.log('fetching all challenges: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching all challenges:', error);
    throw error; 
  }
}