import axios from 'axios';

export const fetchProfileWithNickname = async (nickname) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}api/profile/${nickname}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('fetching Other Profile data: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching Other Profile data:', error);
    throw error;
  }
}