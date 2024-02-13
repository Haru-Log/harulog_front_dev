import axios from 'axios';

export const sendLoginRequest = async (userInfo) => {
  try {
    const response = await axios.post('https://k43884eb26cf9a.user-app.krampoline.com/api/login',
      {
        "email": userInfo.email,
        "password": userInfo.password,
      });
    console.log('Request login: ', response.data.message);

    const AccessToken = response.headers.getAuthorization()
    localStorage.setItem('AccessToken', AccessToken);

    return response.data;
  } catch (error) {
    console.error('Error login:', error);
    throw error;
  }
}