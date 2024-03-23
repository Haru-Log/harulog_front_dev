import { useParams } from 'react-router-dom';
import ChallengeDetailHeader from '../components/ChallengeDetailPage/ChallengeDetailHeader';
import ChallengeInfo from '../components/ChallengeDetailPage/ChallengeInfo';
import ChallengeMemberList from '../components/ChallengeDetailPage/ChallengeMemberList';
import { useChallengeDetailStore } from '../zustand/challengeDetailStore';
import { useEffect } from 'react';
import { fetchChallengeADetail } from '../api/challenge/FetchChallengeDetail';

const ChallengeDetailPage = () => {
  const { id } = useParams();
  const setChallenge = useChallengeDetailStore((state) => state.setChallenge);
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
    <div className="mx-10 font-ibm">
      {challenge ? (
        <div>
          <ChallengeDetailHeader />
          <ChallengeInfo />
          <ChallengeMemberList />
        </div>
      ) : (
        <div className="text-center">챌린지를 찾을 수 없습니다.</div>
      )}
    </div>
  );
};

export default ChallengeDetailPage;
