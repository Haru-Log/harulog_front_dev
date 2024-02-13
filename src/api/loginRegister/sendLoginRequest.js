import axios from 'axios';

export const sendLoginRequest = async (userInfo) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_DEPLOY}api/login`,
      {
        "email": userInfo.email,
        "password": userInfo.password,
      });
    console.log('Request login: ', response.data.message);

    const AccessToken = response.headers.getAuthorization().split(' ')[1]
    localStorage.setItem('AccessToken', AccessToken);

    return response.data;
  } catch (error) {
    console.error('Error login:', error);
    throw error;
  }
}