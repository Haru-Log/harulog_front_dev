import axios from 'axios';

export const fetchHeatmap = async () => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/grow/yearly`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('fetching heatmap data: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching heatmap data:', error);
    throw error; 
  }
}