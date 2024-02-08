import { useEffect, useState } from 'react';
import Cards from '../components/ChallengePage/Cards'
import CreateButton from '../components/CreateButton'
import FilterGroup from '../components/FilterGroup'
import { fetchChallengeAll } from '../api/challenge/FetchChallengeAll';

const ChallengePage = () => {
  const [challengeData, setChallengeData] = useState([]);

  useEffect(() => {
    const fetchChallenges= async () => {
      try {
        const response = await fetchChallengeAll();
        setChallengeData(response.data);
      }
      catch (error) {
        console.error(error);
      }
    }
    fetchChallenges();
  }
  , []);

  return (
    <div className='flex flex-col items-center font-ibm'>
      <FilterGroup />
      <CreateButton />
      <Cards data={challengeData} />
    </div>
  );
};

export default ChallengePage
