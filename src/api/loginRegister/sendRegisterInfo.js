import axios from 'axios';

export const sendRegisterInfo = async (userInfo) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_DEPLOY}api/sign-up`,
      {
        "email": userInfo.email,
        "userName": userInfo.userName,
        "password": userInfo.password,
        "nickname": userInfo.nickname
      });
    console.log('Request register: ', response.data.message);
    return response.data;
  } catch (error) {
    // alert('이미 가입된 이메일입니다.')
  }
}