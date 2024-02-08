import kakao_share from 'src/assets/kakaotalk_sharing_btn_small.png';
import { Button } from 'src/ui/button';
import { shareKakao } from 'src/utils/shareKakaoLink';
import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useChallengeDetailStore } from 'src/zustand/challengeDetailStore';

const ChallengeTopBadge = () => {
  const navigate = useNavigate();
  const challenge = useChallengeDetailStore((state) => state.challenge);
  const challengeId = challenge.challengeId;
  const challengeTitle = challenge.challengeTitle;
  const challengeImage = challenge.imageUrl;
  const challengeCategory = challenge.categoryName;

  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-row'>
        <div className={`text-white text-base text-center font-bold w-fit h-fit px-4 py-1 mr-3 rounded-full shadow-sm bg-${challengeCategory}`}>{challengeCategory}</div>
        <div className='text-white text-base text-center font-bold w-fit h-fit px-4 py-1 rounded-full shadow-sm bg-green-300'>달성 완료</div>
      </div>
      <div className='flex flex-row items-center'>
        <Button className='hover:opacity-70' onClick={() => shareKakao(challengeId, challengeTitle, challengeImage, challengeCategory)}><img src={kakao_share} alt='kakao logo'></img></Button>
        <div className="hover:opacity-70 cursor-pointer" onClick={() => navigate(`/challenge/edit/${challengeId}`)}>
          <Pencil size={30} color='black' />
        </div>
      </div>
    </div>
  )
}

export default ChallengeTopBadge
