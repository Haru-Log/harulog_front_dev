import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import getDiffInDays from 'src/utils/getDiffInDays';
import { useChallengeStore } from 'src/zustand/challengeStore';

const ChallengeDetailHeader = () => {
  const challenge = useChallengeStore((state) => state.challenge);
  const status = challenge ? getDiffInDays(challenge) : '';
  const navigate = useNavigate();
  return (
    <div>
      {challenge &&
        <div className='flex justify-between items-end mt-[85px]'>
          <div>
            <span className='text-4xl font-black mr-3 whitespace-nowrap'>{challenge.challenge_title}</span>
            <span className='font-black whitespace-nowrap'>{status}</span>
          </div>
          <div className='flex'>
            <button className="bg-[#FFCCCC] px-3 py-2 text-[#FF0000] rounded-md text-xs font-bold hover:bg-[#FFdddd] focus:outline-none focus:ring-4 focus:ring-[#FFdddd] whitespace-nowrap">
              챌린지 탈퇴하기
            </button>
            <div className="cursor-pointer" onClick={() => navigate(`/challenge/edit/${challenge.challenge_id}`)}>
            <Pencil size={30} />
          </div>
          </div>
        </div>}
    </div>
  );
};

export default ChallengeDetailHeader;