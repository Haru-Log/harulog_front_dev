import axios from 'axios';

export const sendPostImage = async (formData, feedId) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/feed/image/${feedId}`, formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log('fetching post image data: ', response.data.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching post image data:', error);
    throw error;
  }
}