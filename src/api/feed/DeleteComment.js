import axios from 'axios';

export const deleceComment = async (commentId) => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_DEPLOY}api/comment/${commentId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching feed detail:', error);
    throw error;
  }
}