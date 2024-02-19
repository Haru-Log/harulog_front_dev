import axios from 'axios';

export const sendLoginRequest = async (userInfo) => {

  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/login`,
      {
        "email": userInfo.email,
        "password": userInfo.password,
      });
    const AccessToken = response.headers.getAuthorization().split(' ')[1]
    localStorage.setItem('AccessToken', AccessToken);

    // const role = response.data.data.userRole
    // const nickname = response.data.data.nickname

    // localStorage.setItem('role', role)
    // localStorage.setItem('nickname', nickname);

    return response.data;
  } catch (error) {
    alert(error.response.data.message)
    return error.response.data
  }
}