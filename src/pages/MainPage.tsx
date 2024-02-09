import Slogan from "../components/MainPage/Slogan"
import { useContext } from "react"
import { SetModalContext } from "../App"
import FeedSlide from "../components/MainPage/FeedSlide"
import { dummy_sample } from "../types/FeedItem.type"
import { useNavigate } from "react-router-dom";
import MainChallengeCard from "../components/MainPage/MainChallengeCard"

const MainPage = () => {
  const navi = useNavigate();
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
          <MainChallengeCard />
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
