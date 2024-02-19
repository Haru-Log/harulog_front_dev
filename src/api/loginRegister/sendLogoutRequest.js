import axios from 'axios';

export const sendLogoutRequest = async (userInfo) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/logout`, {}, {
      headers: { "Authorization": `Bearer ${accessToken}` }
    });
    console.log('Request logout: ', response.data.message);
    localStorage.clear();
    return response.data;
  } catch (error) {
    localStorage.clear();
    return error.response.data;
  }
}