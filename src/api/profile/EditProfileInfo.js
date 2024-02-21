import axios from "axios";

export const editProfileInfo = async (userInfo) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/edit/update`,userInfo,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const newToken = response.headers.getAuthorization().split(' ')[1]
    localStorage.setItem('AccessToken', newToken);
    localStorage.setItem('nickname', userInfo.nickname)
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error('Error editing profile:', error.response.data.message);
    throw error
  }
}