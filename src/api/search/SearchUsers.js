import axios from 'axios';

export const searchUsers = async (type, keywords, pageNumber) => {
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DEPLOY}api/search/${type}?content=${keywords}&pageNumber=${pageNumber}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('data: ', response.data);
    console.log('Searching all users: ', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error searching all users:', error.response.data.message);
    throw error; 
  }
}