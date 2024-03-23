import { useEffect } from 'react';
import CreateButton from '../components/CreateButton';
import FilterGroup from '../components/FilterGroup';
import { fetchChallengeAll } from '../api/challenge/FetchChallengeAll';
import { useChallengeAllStore } from '../zustand/challengeAllStore';
import ChallengeCard from '../components/ChallengePage/ChallengeCard';

const ChallengePage = () => {
  const fetchChallenges = useChallengeAllStore((state) => state.setChallenge);

  useEffect(() => {
    const fetchChallengesData = async () => {
      try {
        const response = await fetchChallengeAll();
        fetchChallenges(response.data);
      } catch (error) {
        // console.error(error);
      }
    };
    fetchChallengesData();
  }, [fetchChallenges]);

  return (
    <div className="flex flex-col items-center font-ibm">
      <FilterGroup />
      <CreateButton />
      <ChallengeCard />
    </div>
  );
};

export default ChallengePage;
