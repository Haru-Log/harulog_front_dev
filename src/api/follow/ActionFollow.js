import axios from 'axios';

export const actionFollow = async (targetNickname) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/follow`, {
      to: targetNickname,
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    console.log('Following Succeed: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error following action: ', error.response.data.message);
    throw error;
  }
}