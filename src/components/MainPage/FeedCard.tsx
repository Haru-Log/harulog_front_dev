import React from 'react'
import darkheart from '../../assets/darkheart.png'
import commentImg from '../../assets/comment.svg'

const FeedCard:React.FC<{img: any; name: string; likes: number; comment: number}> = ({img, name, likes, comment}) => {
  return (
    <div className="w-60 object-scale-down flex flex-col items-start">
      <div className="mb-3">
        <img src={img} alt="피드 이미지" className="rounded-xl  h-60 object-cover w-60"/>
      </div>
      <div className="flex flex-row w-[60%] justify-between text-xs h-6">
        <div className="bg-main-color text-white px-3 py-1 rounded-full h-fit w-fit text-center">
          운동
        </div>
        <div className="flex flex-row h-full w-fit align-middle">
          <img src={darkheart} alt="heart" className="object-contain h-[70%] mr-1"/>
          <div className="text-base pb-2 w-fit h-full">{likes}</div>
        </div>
        <div className="flex flex-row">
        <img src={commentImg} alt="heart" className="object-contain h-[70%] mr-1"/>
        <div className="text-base pb-2 w-fit h-full">{comment}</div>
        </div>
      </div>
      <div>
        {name}
      </div>

    </div>
  )
}

export default FeedCard