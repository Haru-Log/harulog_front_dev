import axios from 'axios';

export const fetchFeedAll = async () => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}api/feed/all`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('fetching all posts: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching all posts:', error);
  }
}