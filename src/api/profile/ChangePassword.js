import axios from "axios";

export const changePassword = async (password) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_DEPLOY}api/edit/password`,password,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log(response.data);
    return response.data
  } catch (error) {
    alert(error.response.data.message)
  }
}