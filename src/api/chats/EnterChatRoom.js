import axios from 'axios';

export const enterChatRoom = async (roomId) => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/chats/${roomId}/in`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('enterChatRoom response: ', response.data);
    console.log('Enter the chat room: ', response.data.message);
    return response.data.data;
  } catch (error) {
    console.error('Error Entering the chat room:', error.response.data.message);
    throw error; 
  }
}