import axios from 'axios';

export const deleteFeedOrUsers = async (type, id) => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/admin/${type}/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('data: ', response);
    return response.data;
  } catch (error) {
    console.error('Error deleting info:', error.response.data.message);
    throw error; 
  }
}