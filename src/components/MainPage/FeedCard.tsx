import React from 'react'
import { Heart, MessageSquareMore } from "lucide-react";

const FeedCard: React.FC<{ post_image: any; category_name: string; like: number; comment: number; content: string }> = ({ post_image, category_name, like, comment, content }) => {

  return (
    <div className="cursor-pointer drop-shadow-xl mb-5">
      <div className="w-72 h-72 rounded-xl">
        <img src={post_image} alt="챌린지 이미지" className="object-cover w-full h-full rounded-xl" />
      </div>
      <div className="flex flex-row w-full justify-start text-xs h-6 mt-2">
        <div className={`text-white px-3 py-1 rounded-full h-fit w-fit text-center mr-5 bg-${category_name}`}>
          {category_name}
        </div>
        <div className="flex flex-row h-fit mr-5 items-start">
          <Heart />
          <div className="text-xl pb-2 w-fit h-full ml-1">{like}</div>
        </div>
        <div className="flex flex-row h-fit items-start">
          <MessageSquareMore />
          <div className="text-xl w-fit h-full ml-1">{comment}</div>
        </div>
      </div>
      <div>
        {content}
      </div>
    </div>
  )
}

export default FeedCard