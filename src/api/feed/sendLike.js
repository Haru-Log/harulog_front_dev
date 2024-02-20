import axios from 'axios';

export const sendLike = async (postId) => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/likes/${postId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Like:', error);
  }
}