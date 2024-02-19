import axios from 'axios';

export const actionFollow = async (targetName) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_DEPLOY}api/follow`, {
      to: targetName,
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    console.log('Follow succeed: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error follow action:', error.response.data.message);
    throw error;
  }
}