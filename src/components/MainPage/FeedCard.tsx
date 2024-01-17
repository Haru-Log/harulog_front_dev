import React from 'react'
import { Heart, MessageSquareMore } from "lucide-react";

const FeedCard: React.FC<{ img: any; name: string; likes: number; comment: number }> = ({ img, name, likes, comment }) => {
  return (
    <div className="w-60 object-scale-down flex flex-col items-start">
      <div className="mb-3">
        <img src={img} alt="피드 이미지" className="rounded-xl  h-60 object-cover w-60" />
      </div>
      <div className="flex flex-row w-[60%] justify-between text-xs h-6">
        <div className="bg-[#92C7CF] text-white px-3 py-1 rounded-full h-fit w-fit text-center">
          운동
        </div>
        <div className="flex flex-row h-full w-fit align-middle">
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

export default FeedCard