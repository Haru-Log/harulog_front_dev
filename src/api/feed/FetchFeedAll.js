import axios from 'axios';

export const fetchFeedAll = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}api/feed`);
    console.log('fetching all posts: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw error; 
  }
}