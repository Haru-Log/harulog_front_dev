import axios from 'axios';

export const fetchChallengeProfile = async (nickname) => {
  const accessToken = localStorage.getItem('AccessToken');
  try {

    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/profile/challenge${nickname ? `/${nickname}` : ""}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('fetching all challenges at profile: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching all challenges:', error.response.data.message);
    throw error;
  }
}