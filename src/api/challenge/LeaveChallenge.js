import axios from 'axios';

export const leaveChallenge = async (id) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/challenge/leave`, {
      challengeId: id,
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    console.log('Success to leave challenge: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error to leave challenge:', error.response.data.message);
    throw error;
  }
}