import axios from 'axios';

export const outChatRoom = async (roomId) => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/chats/${roomId}/out`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('outChatRoom response: ', response.data);
    console.log('Out the chat room: ', response.data.message);
    return response.data.data;
  } catch (error) {
    console.error('Error Out the chat room:', error.response.data.message);
    throw error; 
  }
}