import React from 'react'
import { Heart, MessageSquareMore } from "lucide-react";
import { CommentType } from "@/src/types/CommentType";

const FeedCard: React.FC<{
  id: number;
  nickname: string;
  category_name: string;
  content: string;
  imgUrl: string;
  like: number;
  comment: number;
  createdAt: Date;
  updateAt?: Date;
  activityTime: number;
  goal: number;
  commentList?: CommentType[]
  likeCount: number;
  commentCount: 6;
}> = ({
  id, category_name, imgUrl, likeCount, content, commentCount
}) => {

    return (
      <div className="cursor-pointer drop-shadow-xl mb-5 transform transition-transform hover:scale-110">
        <div className="w-[100%] aspect-square rounded-xl">
          <img src={imgUrl} alt="피드 이미지" className="object-cover w-full h-full rounded-xl" />
        </div>
        <div className="flex flex-row w-full justify-start text-xs h-6 mt-2">
          <div className={`text-white px-3 py-1 rounded-full h-fit w-fit text-center mr-5 bg-${category_name}`}>
            {category_name}
          </div>
          <div className="flex flex-row h-fit mr-5 items-start">
            <Heart />
            <div className="text-xl pb-2 w-fit h-full ml-1">{likeCount}</div>
          </div>
          <div className="flex flex-row h-fit items-start">
            <MessageSquareMore />
            <div className="text-xl w-fit h-full ml-1">{commentCount}</div>
          </div>
        </div>
        <div>
          {content}
        </div>
      </div>
    )
  }

export default FeedCard