import axios from 'axios';

export const fetchFeedDetail = async (feedId) => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/feed/${feedId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('fetching feed detail: ', response.data.message);
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching feed detail:', error);
    throw error;
  }
}