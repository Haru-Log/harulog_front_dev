import axios from 'axios';

export const fetchChallengeADetail = async (challengeId) => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/challenge/${challengeId}`,{
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('data: ', response.data);
    console.log('fetching challenge detail: ', response.data.message);
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching challenge detail:', error.response.data.message);
    throw error; 
  }
}