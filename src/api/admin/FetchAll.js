import axios from 'axios';

export const fetchAll = async (type, pageNumber) => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}api/admin/${type}?pageNumber=${pageNumber}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('data: ', response.data);
    console.log('Fetching all for admin: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error fetching all for admin:', error.response.data.message);
    throw error; 
  }
}