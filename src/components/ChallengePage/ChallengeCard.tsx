import React from 'react'
import { useNavigate } from "react-router-dom";
import { Flame } from 'lucide-react';
import { ChallengeAll } from 'src/types/ChallengeAll.type';

const ChallengeCard: React.FC<ChallengeAll> = ({ challengeId, challengeTitle, categoryName, challengeUserCount, imageUrl }) => {

  const navigate = useNavigate();

  return (
    <div className="cursor-pointer transform transition-transform hover:scale-110 drop-shadow-xl" onClick={() => navigate(`/challenge/${challengeId}`)}>
      <div className="w-[90%] h-[90%] aspect-square rounded-xl">
        <img src={imageUrl} alt="챌린지 이미지" className="object-cover w-full h-full rounded-xl" />
        <div className={`absolute top-0 right-[10%] text-white text-xs font-bold px-3 py-1 mr-2 mt-2 rounded-lg bg-${categoryName}`}>
        {categoryName}
      </div>
      <div className="absolute bottom-[10%] left-0 right-0 p-3 pt-9 bg-gradient-to-b from-transparent to-slate-800 rounded-b-xl w-[90%]">
        <span className="text-white text-lg font-semibold whitespace-nowrap">{challengeTitle}</span>
        <div className="flex flex-col items-center absolute bottom-0 right-0 pb-3 pr-3">
          <Flame color="white" strokeWidth={4} />
          <span className="text-white text-xs mt-1 font-semibold">{challengeUserCount}</span>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ChallengeCard
