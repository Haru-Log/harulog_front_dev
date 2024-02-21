import axios from 'axios';

export const exitChatRoom = async (roomId) => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/chats/${roomId}/me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('exitChatRoom: ', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error exiting the chat room:', error.response.data.message);
    throw error; 
  }
}