import { useChallengeDetailStore } from 'src/zustand/challengeDetailStore';

const ChallengeInfoLeft = () => {
  const challenge = useChallengeDetailStore((state) => state.challenge);
  const startDate = new Date(challenge.startDate);
  const endDate = new Date(challenge.endDate);
  
  const startDateString = `${startDate.getFullYear()}/${startDate.getMonth() + 1}/${startDate.getDate()}`;
  const endDateString = `${endDate.getFullYear()}/${endDate.getMonth() + 1}/${endDate.getDate()}`;
  const challengeTerm = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;
  

  const challengeGoal = challenge.categoryName === "기상" ?
    `${Math.floor(challenge.challengeGoal / 60) < 12 ?
      `오전 ${Math.floor(challenge.challengeGoal / 60)}` :
      `오후 ${Math.floor(challenge.challengeGoal / 60) === 12 ? '12' : `${Math.floor(challenge.challengeGoal / 60) - 12}`}`}시 ${challenge.challengeGoal % 60}분` : `${challenge.challengeGoal}분`;

  return (
    <div className='flex flex-col mr-10'>
      <div>
        <img src={challenge.imageUrl} alt="챌린지 이미지" className="object-cover aspect-square max-w-96 rounded-xl drop-shadow-md" />
        <div className='flex flex-row mt-3 items-center'>
          <span className='font-bold text-base mr-10 whitespace-nowrap'>목표</span>
          <span className='font-bold'>{challengeGoal}</span>
        </div>
        <div className='flex flex-row mt-3 items-center'>
          <span className='font-bold text-base mr-10 whitespace-nowrap'>기간</span>
          <span className='font-bold text-sm whitespace-nowrap'>{startDateString} - {endDateString} [{challengeTerm}일]</span>
        </div>
      </div>
    </div>
  )
}

export default ChallengeInfoLeft
