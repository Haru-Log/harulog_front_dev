import React from 'react'
import Slogan from "../components/MainPage/Slogan"
import ChallengeCard from "../components/MainPage/ChallengeCard"

// dummy images
import achievement from '../assets/achievement-5597527_640.png'
import nodap from '../assets/20231010_084411.jpg'
import FeedCard from "../components/MainPage/FeedCard"



const MainPage = () => {

  const dummy_chals = [
    { name: '한 달 영어완성 챌린지', img: achievement },
    { name: '아침 조깅', img: achievement },
    { name: '독서하기 (주 3회)', img: achievement },
    { name: '근력 운동 (주 4회)', img: achievement }
  ]

  
  const dummy_feeds = [
    { name: '뼈맞음', img: nodap, likes: 3, comment: 5 },
    { name: '오운완', img: nodap, likes: 3, comment: 5 },
    { name: '인상깊었던 구절', img: nodap, likes: 3, comment: 5 },
  ]



  return (
    <div className="flex flex-col w-full h-full pl-5 pr-6">
      <Slogan />
      <div className="w-full flex flex-col mb-10">
        <div className="flex flex-row justify-between items-baseline w-full mb-5">
          <div className="text-xl">진행중인 챌린지</div>
          <div className="text-sm text-main-color">모든 챌린지</div>
        </div>
        <div className="flex flex-row justify-between">
          {dummy_chals.map((ch, idx) =>
            <ChallengeCard key={idx} img={ch.img} name={ch.name} />
          )}
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-baseline w-full mb-5">
          <div className="text-xl">진행중인 챌린지</div>
          <div className="text-sm text-main-color">가입하기</div>
        </div>
        <div className="flex flex-row justify-between">
          {
            dummy_feeds.map((feed, idx) => 
            <FeedCard key={idx} img={feed.img} name={feed.name} likes={feed.likes} comment={feed.comment} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default MainPage
