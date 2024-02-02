import { useChallengeStore } from 'src/zustand/challengeStore';

const ChallengeInfoLeft = () => {
  const challenge = useChallengeStore((state) => state.challenge);
  const startDate = new Date(challenge.start_date!);
  const endDate = new Date(challenge.end_date!);
  const startDateString = startDate.toISOString().split('T')[0].replace(/-/g, '/');
  const endDateString = endDate.toISOString().split('T')[0].replace(/-/g, '/');

  const challengeTerm = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;

  const challengeGoal = challenge.category_name === "기상" ?
    `${Math.floor(challenge.challenge_goal / 60) < 12 ?
      `오전 ${Math.floor(challenge.challenge_goal / 60)}` :
      `오후 ${Math.floor(challenge.challenge_goal / 60) === 12 ? '12' : `${Math.floor(challenge.challenge_goal / 60) - 12}`}`}시 ${challenge.challenge_goal % 60}분` : `${challenge.challenge_goal}분`;

  return (
    <div className='flex flex-col mr-10'>
      <div>
        <img src={challenge.challenge_image} alt="챌린지 이미지" className="object-cover aspect-square max-w-96 rounded-xl drop-shadow-md" />
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
