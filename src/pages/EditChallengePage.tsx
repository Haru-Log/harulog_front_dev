import React, { useEffect } from 'react'
import EditInputCard from '../components/EditChallengePage/EditInputCard'
import { useParams } from 'react-router-dom';
import { fetchChallengeADetail } from '../api/challenge/FetchChallengeDetail';
import { useChallengeDetailStore } from '../zustand/challengeDetailStore';

const EditChallengePage = () => {
  const { id } = useParams();
  const setChallenge = useChallengeDetailStore(state => state.setChallenge);
  const challenge = useChallengeDetailStore((state) => state.challenge);

  useEffect(() => {
    const fetchChallengeDetails = async () => {
      try {
        const challengeDetails = await fetchChallengeADetail(id);
        setChallenge(challengeDetails.data);
      } catch (error) {
        console.error('Error fetching challenge details:', error);
      }
    };
    fetchChallengeDetails();
  }, [id, setChallenge]);

  return (
    <div className='font-ibm'>
      {challenge ? <EditInputCard /> : <div className='text-center'>해당 챌린지를 찾을 수 없습니다.</div>}
    </div>
  )
}

export default EditChallengePage
