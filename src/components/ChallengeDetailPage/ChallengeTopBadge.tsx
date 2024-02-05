import { useChallengeStore } from 'src/zustand/challengeStore';
import kakao_share from 'src/assets/kakaotalk_sharing_btn_small.png';
import { Button } from 'src/ui/button';
import { shareKakao } from 'src/utils/shareKakaoLink';
import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChallengeTopBadge = () => {
  const navigate = useNavigate();
  const challenge = useChallengeStore((state) => state.challenge);
  const challengeId = challenge.challenge_id;
  const challengeTitle = challenge.challenge_title;
  const challengeImage = challenge.challenge_image;
  const challengeCategory = challenge.category_name;

  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-row'>
        <div className={`text-white text-base text-center font-bold w-fit h-fit px-4 py-1 mr-3 rounded-full shadow-sm bg-${challenge.category_name}`}>{challenge.category_name}</div>
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
