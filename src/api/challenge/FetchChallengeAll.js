import axios from 'axios';

export const fetchChallengeAll = async () => {
  const response = await axios.get('http://localhost:3003/challenge');
  return response.data;
}