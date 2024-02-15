import axios from 'axios';

export const fetchGoal = async () => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}api/user-goal`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('fetching Goal data: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching Goal data:', error);
    throw error; 
  }
}