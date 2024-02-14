import axios from 'axios';

export const fetchProfile = async (id) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}api/profile${id ? `/${id}` : ""}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('fetching Profile data: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching Profile data:', error);
    throw error;
  }
}