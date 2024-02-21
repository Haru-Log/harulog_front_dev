import axios from 'axios';

export const loadPrevMsg = async (roomId, msgId) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/chats/${roomId}/scroll-up`, {
      messageId: msgId,
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('loadPrevMsg response: ', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error Load Prev Messages:', error.response.data.message);
    throw error; 
  }
}