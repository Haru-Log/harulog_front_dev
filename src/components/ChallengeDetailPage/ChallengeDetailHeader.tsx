import { useChallengeStore } from 'src/zustand/challengeStore';

const ChallengeDetailHeader = () => {
  const challenge = useChallengeStore((state) => state.challenge);
  return (
    <div>
      {challenge &&
        <div className='flex justify-between items-end mt-20'>
          <span className='text-4xl font-black'>{challenge.challenge_title}</span>
          <button className="bg-[#FFCCCC] px-3 py-2 text-[#FF0000] rounded-md text-md font-bold">
            챌린지 탈퇴하기
          </button>
        </div>}
    </div>
  );
};

export default ChallengeDetailHeader;
