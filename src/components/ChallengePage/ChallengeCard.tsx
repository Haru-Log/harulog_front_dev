import React from 'react'
import { ChallengeItem } from '@/src/types/ChallengeItem.type'
import { useNavigate } from "react-router-dom";
import { Flame } from 'lucide-react';

const ChallengeCard: React.FC<ChallengeItem> = ({ challenge_id, category_id, chatroom_id, challenge_title, challenge_content, challenge_goal, challenge_image, participants, submission, start_date, end_date, created_at, updated_at }) => {

  const navigate = useNavigate();

  return (
    <div className="cursor-pointer transform transition-transform hover:scale-110 drop-shadow-xl" onClick={() => navigate(`/challenge/${challenge_id}`)}>
      <div className="w-72 h-72 rounded-xl">
        <img src={challenge_image} alt="챌린지 이미지" className="object-cover w-full h-full rounded-xl" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 pt-9 bg-gradient-to-b from-transparent to-slate-800 rounded-b-xl w-72">
        <span className="text-white text-lg font-semibold">{challenge_title}</span>
        <div className="flex flex-col items-center absolute bottom-0 right-0 pb-3 pr-3">
          <Flame color="white" strokeWidth={4} />
          <span className="text-white text-xs mt-1 font-semibold">{participants}</span>
        </div>
      </div>
    </div>
  )
}

export default ChallengeCard
