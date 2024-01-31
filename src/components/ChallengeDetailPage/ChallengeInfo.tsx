import ChallengeTopBadge from './ChallengeTopBadge';
import ChallengeInfoLeft from './ChallengeInfoLeft';
import ChallengeInfoRight from './ChallengeInfoRight';

const ChallengeInfo = () => {
  return (
    <div className='flex flex-col mx-10 mt-10 border-2 rounded-xl px-10 py-10'>
      <ChallengeTopBadge />
      <div className='flex flex-row mt-4'>
        <ChallengeInfoLeft />
        <ChallengeInfoRight />
      </div>
    </div>
  )
}

export default ChallengeInfo
