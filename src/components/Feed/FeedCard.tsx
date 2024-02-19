import React, { useEffect, useRef } from 'react'
import { Heart, MessageSquareMore } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FeedItem } from '../../types/FeedItem.type';

interface FeedCardType extends FeedItem {
  idx: number;
  setIsImgLoaded: any
  isImgLoaded: boolean[]
}

const FeedCard: React.FC<FeedCardType> =
  ({ id, categoryName, content, imgUrl, likeCount, commentCount, idx, setIsImgLoaded, isImgLoaded }) => {

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
      <div className="w-96 flex flex-col items-start cursor-pointer transform transition-transform hover:scale-110" onClick={() => navigate(`/feed/${id}`)}>
        <div className="mb-3">
          <img src={imgUrl} alt="피드 이미지" className="rounded-xl h-fit w-96 transform transition-transform hover:scale-110" ref={imgRef} />
        </div>
        <div className="flex flex-row w-full justify-start text-xs h-6">
          <div className={`text-white px-3 py-1 rounded-full h-fit w-fit text-center mr-5 bg-${categoryName}`}>
            {categoryName}
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