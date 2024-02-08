import { useChallengeDetailStore } from 'src/zustand/challengeDetailStore';
import getDiffInDays from 'src/utils/getDiffInDays';

const ChallengeDetailHeader = () => {
  const challenge = useChallengeDetailStore((state) => state.challenge);
  const status = challenge ? getDiffInDays(challenge) : '';
  return (
    <div>
      {challenge &&
        <div className='flex justify-between items-end mt-[85px]'>
          <div>
            <span className='text-4xl font-black mr-3 whitespace-nowrap'>{challenge.challengeTitle}</span>
            <span className='font-black whitespace-nowrap'>{status}</span>
          </div>
          <div className='flex'>
            <button className="bg-[#FFCCCC] px-3 py-2 text-[#FF0000] rounded-md text-xs font-bold hover:bg-[#FFdddd] focus:outline-none focus:ring-4 focus:ring-[#FFdddd] whitespace-nowrap">
              챌린지 탈퇴하기
            </button>
          </div>
        </div>}
    </div>
  );
};

export default ChallengeDetailHeader;