import Slogan from "../components/MainPage/Slogan"
import { useContext, useEffect, useState } from "react"
import { SetModalContext } from "../App"
import { ChallengeItem } from "../types/ChallengeItem.type"
import ChallengeCard from "../components/ChallengePage/ChallengeCard"
import FeedSlide from "../components/MainPage/FeedSlide"
import { dummy_sample } from "../types/FeedItem.type"
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";


const MainPage = () => {
  const [challenges, setChallenges] = useState<ChallengeItem[]>([]);
  const navi = useNavigate();

  useEffect(() => {
    const getRandomChallenges = async () => {
      const response = await axios.get('/main/challenge');
      
      setChallenges(response.data)
    }
    getRandomChallenges()

  }, [])

  const setRegisterModal = useContext(SetModalContext)?.setRegisterModal;

  return (
    <div className="flex flex-col w-full h-full pl-5 pr-6 pt-20 items-center justify-center font-ibm">
      <Slogan />
      <div className="flex flex-col mb-10 w-full">
        <div className="flex flex-row justify-between items-baseline w-full mb-5">
          <div className="text-xl">진행중인 챌린지</div>
          <div className="text-sm text-[#92C7CF] cursor-pointer" onClick={() => navi('/challenge')}>모든 챌린지</div>
        </div>
        <div className="flex justify-center">
          {
            challenges.map((item) =>
              <ChallengeCard challengeId={0} challengeTitle={""} categoryName={""} challengeUserCount={0} imageUrl={""} key={item.challenge_id} {...item} />
            )
          }
        </div>
      </div>
      <div className="w-full mb-10 flex flex-col">
        <div className="flex flex-row justify-between items-baseline w-full mb-5">
          <div className="text-xl">피드</div>
          <div className="text-sm text-[#92C7CF] cursor-pointer" onClick={() => { setRegisterModal(true) }}>가입하기</div>
        </div>

        <div className="flex justify-center">
          <FeedSlide data={dummy_sample} />
        </div>


      </div>
    </div>
  )
}

export default MainPage
