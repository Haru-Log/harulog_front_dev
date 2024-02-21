import axios from 'axios';

export const createNewChatRoom = async (userList) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/chats`, {
      userNicknames: userList,
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('createNewChatRoom response: ', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error Entering the chat room:', error.response.data.message);
    throw error; 
  }
}