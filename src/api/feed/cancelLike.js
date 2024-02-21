import axios from 'axios';

export const cancelLike = async (postId) => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/post/likes/${postId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Cancel Like:', error);
  }
}