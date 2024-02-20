import axios from 'axios';

export const addComment = async (feedId, commentId, content) => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/${feedId}/comment/${commentId}`, {
      content: content
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('fetching feed detail: ', response.data.message);
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching feed detail:', error);
    throw error;
  }
}