import kakao_share from 'src/assets/kakaotalk_sharing_btn_small.png';
import { Button } from 'src/ui/button';
import { shareKakao } from 'src/utils/shareKakaoLink';
import { Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useChallengeDetailStore } from 'src/zustand/challengeDetailStore';
import { useState } from 'react';
import { deleteChallenge } from 'src/api/challenge/DeleteChallenge';
import ConfirmationModal from '../ConfirmationModal';
import getLeaderName from 'src/utils/getLeaderName';

const ChallengeTopBadge = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const challenge = useChallengeDetailStore((state) => state.challenge);
  const challengeId = challenge.challengeId;
  const challengeTitle = challenge.challengeTitle;
  const challengeImage = challenge.imageUrl;
  const challengeCategory = challenge.categoryName;

  const deleteButtonOnClick = async () => {
    try {
      await deleteChallenge(challengeId);
      alert('Challenge deleted successfully!');
    } catch (error) {
      console.error('Error deleting challenge:', error);
      alert('Failed to delete challenge. Please try again.');
    }
    setShowConfirmation(false);
    navigate(`/challenge`)
  }

  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-row'>
        <div className={`text-white text-base text-center font-bold w-fit h-fit px-4 py-1 mr-3 rounded-full shadow-sm bg-${challengeCategory}`}>{challengeCategory}</div>
        <div className='text-white text-base text-center font-bold w-fit h-fit px-4 py-1 rounded-full shadow-sm bg-green-300'>달성 완료</div>
      </div>
      <div className='flex flex-row items-center'>
        <Button className='hover:opacity-70' onClick={() => shareKakao(challengeId, challengeTitle, challengeImage, challengeCategory, getLeaderName(challenge))}><img src={kakao_share} alt='kakao logo'></img></Button>
        {challenge.challengeLeader && <>
          <div className="hover:opacity-70 cursor-pointer mr-3" onClick={() => navigate(`/challenge/edit/${challengeId}`)}>
            <Pencil size={30} />
          </div>
          <div className="hover:opacity-70 cursor-pointer" onClick={() => setShowConfirmation(true)}>
            <Trash2 size={30} />
          </div>
        </>}
      </div>
      {showConfirmation && (
        <ConfirmationModal
          message="정말로 챌린지를 삭제하시겠습니까?"
          onConfirm={deleteButtonOnClick}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  )
}

export default ChallengeTopBadge
