import axios from 'axios';

export const sendRegisterInfo = async (userInfo) => {
  try {
    const response = await axios.post('https://k43884eb26cf9a.user-app.krampoline.com/api/sign-up',
      {
        "email": userInfo.email,
        "userName": userInfo.userName,
        "password": userInfo.password,
        "nickname": userInfo.nickname
      });
    console.log('Request register: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error register:', error);
    throw error;
  }
}