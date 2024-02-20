import axios from 'axios';

export const editComment = async (commentId, content) => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/comment/${commentId}`, {
      content: content
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error edit comment:', error);
    throw error;
  }
}