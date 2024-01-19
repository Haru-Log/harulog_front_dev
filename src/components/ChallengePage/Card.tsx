import { ChallengeItem } from '@/src/types/ChallengeItem.type'
import React, { useEffect, useState } from 'react'
import { category_themes, dummy_categories } from "../../types/Category.type";
import { useNavigate } from "react-router-dom";
import { Flame } from 'lucide-react';


const Card: React.FC<ChallengeItem> = ({ challenge_id, category_id, chatroom_id, challenge_title, challenge_content, challenge_goal, challenge_image, participants, submission, start_date, end_date, created_at, updated_at }) => {
  const [theme, setTheme] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setTheme(category_themes[category_id - 1])
    setCategory(dummy_categories.filter((x) => x.category_id === category_id)[0].category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="cursor-pointer mb-3 relative group transform transition-transform hover:scale-110" onClick={() => navigate(`/challenge/${challenge_id}`)}>
      <div className="w-72 h-72 overflow-hidden rounded-xl">
        <img src={challenge_image} alt="챌린지 이미지" className="object-cover w-full h-full rounded-xl" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 pt-7 bg-gradient-to-b from-transparent to-slate-800 rounded-b-xl">
        <span className="text-white text-md font-bold">{challenge_title}</span>
        <div className="flex flex-col items-center absolute bottom-0 right-0 pb-3 pr-3">
          <Flame color="white" strokeWidth={4} />
          <span className="text-white text-xs">{participants}</span>
        </div>
      </div>
    </div>
  )
}

export default Card
