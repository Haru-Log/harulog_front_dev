import axios from "axios";

export const deleteAccount = async (confirmString) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_DEPLOY}api/edit/delete`, { 'confirmString': confirmString },
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