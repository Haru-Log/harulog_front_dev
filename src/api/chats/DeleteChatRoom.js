import axios from 'axios';

export const deleteChatRoom = async (roomId) => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/chats/${roomId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('deleteChatRoom: ', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error deleting the chat room:', error.response.data.message);
    throw error; 
  }
}