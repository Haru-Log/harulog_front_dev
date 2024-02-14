import axios from 'axios';

export const fetchDaily = async () => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}api/grow/daily`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('fetching daily data: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching daily data:', error);
    throw error; 
  }
}