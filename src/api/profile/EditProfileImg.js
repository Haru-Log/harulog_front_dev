import axios from 'axios';

export const EditProfileImg = async (formData) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/user/image`, formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log('fetching Profile data: ', response.data.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching Profile data:', error);
    throw error;
  }
}