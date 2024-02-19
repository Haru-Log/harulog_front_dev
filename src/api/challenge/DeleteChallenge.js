import axios from 'axios';

export const deleteChallenge = async (id) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/challenge/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    console.log('Deleting all challenges: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error deleting challenge:', error.response.data.message);
    throw error;
  }
}