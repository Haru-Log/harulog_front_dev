import axios from 'axios';

export const cancelFollow = async (targetNickname) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/following/${targetNickname}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    console.log('Following cancel Succeed: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error following cancel: ', error.response.data.message);
    throw error;
  }
}