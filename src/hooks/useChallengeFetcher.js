import { useEffect } from 'react';
import dummyChallengeData from '../types/ChallengeItem.dummy';
import { useChallengeStore } from '../zustand/challengeStore';

const useChallengeFetcher = (id) => {
  const challengeIdToFind = id;
  const selectedChallenge = isNaN(challengeIdToFind)
    ? undefined
    : dummyChallengeData.find((challenge) => challenge.challenge_id === challengeIdToFind);
  const setChallenge = useChallengeStore((state) => state.setChallenge);

  useEffect(() => {
    if (selectedChallenge) {
      setChallenge(selectedChallenge);
    }
  }, [selectedChallenge, setChallenge]);

  return selectedChallenge;
};

export default useChallengeFetcher;