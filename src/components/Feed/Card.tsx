import React from 'react'
import { Heart, MessageSquareMore } from "lucide-react";

const Card: React.FC<{ img: any; name: string; likes: number; comment: number }> = ({ img, name, likes, comment }) => {
  return (
    <div className="w-96 flex flex-col items-start">
      <div className="mb-3">
        <img src={img} alt="피드 이미지" className="rounded-xl h-fit w-96" />
      </div>
      <div className="flex flex-row w-full justify-start text-xs h-6">
        <div className="bg-[#92C7CF] text-white px-3 py-1 rounded-full h-fit w-fit text-center mr-5">
          운동
        </div>
        <div className="flex flex-row h-full w-fit align-text-top mr-5">
          <Heart />
          <div className="text-xl pb-2 w-fit h-full ml-1">{likes}</div>
        </div>
        <div className="flex flex-row">
          <MessageSquareMore />
          <div className="text-xl pb-2 w-fit h-full ml-1">{comment}</div>
        </div>
      </div>
      <div>
        {name}
      </div>

    </div>
  )
}

export default Card