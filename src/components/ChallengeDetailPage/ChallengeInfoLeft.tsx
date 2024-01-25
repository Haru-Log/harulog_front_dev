import { useChallengeStore } from 'src/zustand/challengeStore';

const ChallengeInfoLeft = () => {
  const challenge = useChallengeStore((state) => state.challenge);
  const startDate = new Date(challenge.start_date);
  const endDate = new Date(challenge.end_date);
  const startDateString = startDate.toISOString().split('T')[0].replace(/-/g, '/');
  const endDateString = endDate.toISOString().split('T')[0].replace(/-/g, '/');

  const challengeTerm = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;

  return (
    <div className='flex flex-col basis-2/5 mr-10'>
      <img src={challenge.challenge_image} alt="챌린지 이미지" className="object-cover aspect-square max-w-96 rounded-xl drop-shadow-md" />
      <div className='flex flex-row mt-3 items-center'>
        <span className='font-bold text-base mr-10 whitespace-nowrap'>목표</span>
        <span className='font-bold'>{challenge.challenge_goal}{challenge.category_name === "기상" ? "일" : "분"}</span>
      </div>
      <div className='flex flex-row mt-3 items-center'>
        <span className='font-bold text-base mr-10 whitespace-nowrap'>기간</span>
        <span className='font-bold text-sm whitespace-nowrap'>{startDateString} - {endDateString} [{challengeTerm}일]</span>
      </div>
    </div>
  )
}

export default ChallengeInfoLeft