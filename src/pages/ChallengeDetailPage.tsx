import { useParams } from 'react-router-dom';
import useChallengeFetcher from '../hooks/useChallengeFetcher';
import ChallengeDetailHeader from '../components/ChallengeDetailPage/ChallengeDetailHeader'
import ChallengeInfo from '../components/ChallengeDetailPage/ChallengeInfo';
import ChallengeMemberList from '../components/ChallengeDetailPage/ChallengeMemberList';

const ChallengeDetailPage = () => {
  const { id } = useParams();
  const selectedChallenge = useChallengeFetcher(Number(id));

  return (
    <div className='mt-12 mx-10'>
      {selectedChallenge ?
        <div>
          <ChallengeDetailHeader />
          <ChallengeInfo />
          <ChallengeMemberList />
        </div>
        : <div className='text-center'>챌린지를 찾을 수 없습니다.</div>}
    </div>
  )
}

export default ChallengeDetailPage
