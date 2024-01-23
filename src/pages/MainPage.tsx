import Slogan from "../components/MainPage/Slogan"

// dummy images
import nodap from '../assets/20231010_084411.jpg'
import FeedCard from "../components/MainPage/FeedCard"
import { useContext, useEffect, useState } from "react"
import { SetModalContext } from "../App"
import dummyChallengeData from './../types/ChallengeItem.dummy';
import { ChallengeItem } from "../types/ChallengeItem.type"
import ChallengeCard from "../components/ChallengePage/ChallengeCard"


const MainPage = () => {
  const dummy_feeds = [
    { name: '뼈맞음', img: nodap, likes: 3, comment: 5 },
    { name: '오운완', img: nodap, likes: 3, comment: 5 },
    { name: '인상깊었던 구절', img: nodap, likes: 3, comment: 5 },
  ]

  const [challenges, setChallenges] = useState<ChallengeItem[]>([]);

  useEffect(() => {
    const challengeItems = [...dummyChallengeData];
    const showItems = []
    while (showItems.length < 4) {
      showItems.push(challengeItems.splice(Math.floor(Math.random() * challengeItems.length), 1)[0])
    }
    setChallenges(showItems)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dummyChallengeData])

  const setRegisterModal = useContext(SetModalContext)?.setRegisterModal;

  return (
    <div className="flex flex-col w-full h-full pl-5 pr-6 pt-12 items-center">
      <Slogan />
      <div className="w-[80%] flex flex-col mb-10">
        <div className="flex flex-row justify-between items-baseline w-full mb-5">
          <div className="text-xl">진행중인 챌린지</div>
          <div className="text-sm text-[#92C7CF]">모든 챌린지</div>
        </div>
        <div className="flex flex-row justify-between">
          {
            challenges.map((item) =>
              <ChallengeCard key={item.challenge_id} {...item} />
            )
          }
        </div>
      </div>
      <div className="w-[80%] flex flex-col">
        <div className="flex flex-row justify-between items-baseline w-full mb-5">
          <div className="text-xl">피드</div>
          <div className="text-sm text-[#92C7CF] cursor-pointer" onClick={() => { setRegisterModal(true) }}>가입하기</div>
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
