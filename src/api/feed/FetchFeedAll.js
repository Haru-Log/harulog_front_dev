import axios from 'axios';

export const fetchFeedAll = async () => {
  try {
    const response = await axios.get('https://k43884eb26cf9a.user-app.krampoline.com/api/feed');
    console.log('fetching all posts: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw error; 
  }
}