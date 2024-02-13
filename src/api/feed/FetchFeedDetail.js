import axios from 'axios';

export const fetchFeedDetail = async (feedId) => {
  try {
    const response = await axios.get(`https://k43884eb26cf9a.user-app.krampoline.com/api/feed/${feedId}`);
    console.log('fetching feed detail: ', response.data.message);
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching feed detail:', error);
    throw error; 
  }
}