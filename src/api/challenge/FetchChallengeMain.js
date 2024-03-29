import axios from 'axios';

export const fetchChallengeMain = async () => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/main/challenge`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('data: ', response.data);
    console.log('fetching all challenges at main: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching all challenges:', error.response.data.message);
    throw error; 
  }
}