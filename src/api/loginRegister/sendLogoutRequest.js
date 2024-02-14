import axios from 'axios';

export const sendLogoutRequest = async (userInfo) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_DEPLOY}api/logout`, {}, {
      headers: { "Authorization": `Bearer ${accessToken}` }
    });
    console.log('Request logout: ', response.data.message);
    localStorage.removeItem('AccessToken')
    return response.data;
  } catch (error) {
    console.error('Error logout:', error);
    throw error;
  }
}