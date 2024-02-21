import axios from 'axios';

export const fetchChatsUsers = async (id) => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/chats/${id}/users`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('fetchChatsUsers: ', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching all chat list:', error.response.data.message);
    throw error; 
  }
}