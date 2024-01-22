import { useChallengeStore } from 'src/zustand/challengeStore';

const ChallengeTopBadge = () => {
  const challenge = useChallengeStore((state) => state.challenge);

  return (
    <div className='flex flex-row'>
        <div className={`text-white text-base text-center font-bold w-fit h-fit px-4 py-1 mr-3 rounded-full shadow-sm bg-${challenge.category_name}`}>{challenge.category_name}</div>
        <div className='text-white text-base text-center font-bold w-fit h-fit px-4 py-1 rounded-full shadow-sm bg-green-300'>달성 완료</div>
      </div>
  )
}

export default ChallengeTopBadge
