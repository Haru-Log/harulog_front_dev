import axios from 'axios';

export const fetchChallengeMain = async () => {
  const accessToken = localStorage.getItem('AccessToken')
  try {
    const response = await axios.get('https://k43884eb26cf9a.user-app.krampoline.com/api/main/challenge', {
      // const response = await axios.get('http://localhost:3003/main/challenge', {
      headers:{
        Authorization: accessToken
      }
    });
    console.log('fetching all challenges: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching all challenges:', error);
    throw error; 
  }
}