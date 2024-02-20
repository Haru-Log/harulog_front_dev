import axios from 'axios';

export const deleteFollower = async (targetNickname) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/follower/${targetNickname}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    console.log('Follower delete Succeed: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error delete follower: ', error.response.data.message);
    throw error;
  }
}