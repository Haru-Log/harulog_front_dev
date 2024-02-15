import axios from "axios";

export const editProfileInfo = async (userInfo) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_DEPLOY}api/edit/update`,userInfo,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error('Error editing profile:', error.response.data.message);
    throw error
  }
}