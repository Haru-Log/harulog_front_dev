import React, { useEffect, useRef, useState } from 'react'
import { Heart, MessageSquareMore } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FeedItem } from '../../types/FeedItem.type';

interface FeedCardType extends FeedItem {
  idx: number;
  setIsImgLoaded: any
  isImgLoaded: boolean[]
}

const FeedCard: React.FC<FeedCardType> =
  ({ post_id, category_name, content, post_image, like, comment, idx, setIsImgLoaded, isImgLoaded }) => {

    const navigate = useNavigate();

    const imgRef = useRef<HTMLImageElement>(null);


    useEffect(() => {
      if (!imgRef.current) {
        return;
      }

      const updateStatus = (img: HTMLImageElement) => {
        const isLoaded = img?.complete && img?.naturalHeight !== 0;
        if (isImgLoaded) {
          setIsImgLoaded(isImgLoaded.map((x, i) => {
            if (i === idx) {
              return isLoaded;
            } else {
              return x
            }
          }))
        }
      }

      imgRef.current.addEventListener(
        "load",
        () => updateStatus(imgRef.current as HTMLImageElement),
        { once: true }
      );

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imgRef])

    return (
      <div className="w-96 flex flex-col items-start cursor-pointer" onClick={() => navigate(`/feed/${post_id}`)}>
        <div className="mb-3">
          <img src={post_image} alt="피드 이미지" className="rounded-xl h-fit w-96" ref={imgRef} />
        </div>
        <div className="flex flex-row w-full justify-start text-xs h-6">
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