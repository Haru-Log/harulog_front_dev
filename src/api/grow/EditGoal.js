import axios from "axios";

export const editGoal = async (updateGoalsList) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_DEPLOY}/api/user-goal/update`,updateGoalsList,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error('Error editing goal:', error.response.data.message);
    throw error
  }
}