import axios from 'axios';

export const imageUpload = async (formData, id) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/challenge/image/${id}`, formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    console.log('Image upload successfully: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error.response.data.message);
    throw error;
  }
}