import axios from 'axios';

export const fetchEditProfile = async (nickname) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/edit`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('fetching Profile data: ', response.data.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching Profile data:', error);
    throw error;
  }
}