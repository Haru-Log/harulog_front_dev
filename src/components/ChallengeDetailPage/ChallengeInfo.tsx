import ChallengeTopBadge from './ChallengeTopBadge';
import ChallengeInfoLeft from './ChallengeInfoLeft';
import ChallengeInfoRight from './ChallengeInfoRight';

const ChallengeInfo = () => {
  return (
    <div className='border-2 rounded-xl mt-5 px-10 py-6'>
      <ChallengeTopBadge />
      <div className='flex flex-row mt-4'>
        <ChallengeInfoLeft />
        <ChallengeInfoRight />
      </div>
    </div>
  )
}

export default ChallengeInfo
