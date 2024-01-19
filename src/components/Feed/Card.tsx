import React, { useEffect, useState } from 'react'
import { Heart, MessageSquareMore } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FeedItem } from './../../types/FeedItem.type';
import { category_themes, dummy_categories } from "../../types/Category.type";

const Card: React.FC<FeedItem> =
  ({ post_id, user_idx, category_idx, content, post_image, like, comment, created_at, updated_at }) => {

    const [theme, setTheme] = useState("");
    const [category, setCategory] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
      setTheme(category_themes[category_idx - 1])
      setCategory(dummy_categories.filter((x) => x.category_id === category_idx)[0].category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
      <div className="w-96 flex flex-col items-start cursor-pointer" onClick={() => navigate(`/feed/${post_id}`)}>
        <div className="mb-3">
          <img src={post_image} alt="피드 이미지" className="rounded-xl h-fit w-96" />
        </div>
        <div className="flex flex-row w-full justify-start text-xs h-6">
          <div className={`text-white px-3 py-1 rounded-full h-fit w-fit text-center mr-5 ${theme}`}>
            {category}
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

export default Card