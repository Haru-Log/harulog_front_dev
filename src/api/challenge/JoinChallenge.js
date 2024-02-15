import axios from 'axios';

export const joinChallenge = async (id) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_DEPLOY}api/challenge/join`, {
      challengeId: id,
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    console.log('Success joining challenge: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error joining challenge:', error.response.data.message);
    throw error;
  }
}