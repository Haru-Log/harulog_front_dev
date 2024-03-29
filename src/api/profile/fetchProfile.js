import axios from 'axios';

export const fetchProfile = async (nickname) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/profile${nickname ? `/${nickname}` : ""}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('fetching Profile data: ', response.data.data);
    console.log('fetchProfile: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching Profile data:', error);
    throw error;
  }
}