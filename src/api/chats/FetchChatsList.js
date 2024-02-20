import axios from 'axios';

export const fetchChatsList = async () => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/user/chats`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('data: ', response.data.data);
    console.log('fetching all chat list: ', response.data.message);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching all chat list:', error.response.data.message);
    throw error; 
  }
}