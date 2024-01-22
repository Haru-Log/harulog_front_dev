import React from 'react'
import { useChallengeStore } from 'src/zustand/challengeStore';

const ChallengeInfo = () => {
  const challenge = useChallengeStore((state) => state.challenge);
  return (
    <div className='border-2 rounded-xl mt-10 px-14 py-6'>
      <div className={`bg-${challenge.category_name}`}>{challenge.category_name}</div>
    </div>
  )
}

export default ChallengeInfo
