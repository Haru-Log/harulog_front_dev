import { useParams } from 'react-router-dom';
import useChallengeFetcher from '../hooks/useChallengeFetcher';
import ChallengeDetailHeader from '../components/ChallengeDetailPage/ChallengeDetailHeader'
import ChallengeDetailBody from '../components/ChallengeDetailPage/ChallengeInfo';

const ChallengeDetailPage = () => {
  const { id } = useParams();
  const selectedChallenge = useChallengeFetcher(Number(id));

  return (
    <div className='mt-12 mx-10'>
      {selectedChallenge ?
        <div>
          <ChallengeDetailHeader />
          <ChallengeDetailBody />
        </div>
        : <p>챌린지를 찾을 수 없습니다.</p>}
    </div>
  )
}

export default ChallengeDetailPage
