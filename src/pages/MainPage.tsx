import Slogan from "../components/MainPage/Slogan"
import { useContext, useEffect, useState } from "react"
import { SetModalContext } from "../App"
import ChallengeCard from "../components/ChallengePage/ChallengeCard"
import FeedSlide from "../components/MainPage/FeedSlide"
import { dummy_sample } from "../types/FeedItem.type"
import { useNavigate } from "react-router-dom";
import { ChallengeAll } from "../types/ChallengeAll.type";
import { fetchChallengeAll } from "../api/challenge/FetchChallengeAll";


const MainPage = () => {
  const [challenges, setChallenges] = useState<ChallengeAll[]>([]);
  const navi = useNavigate();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetchChallengeAll();
        const challengeItems = response.data;
        const showItems = []
        while (showItems.length < 4) {
          showItems.push(challengeItems.splice(Math.floor(Math.random() * challengeItems.length), 1)[0])
        }
        setChallenges(showItems);
      }
      catch (error) {
        console.error(error);
      }
    }
    fetchChallenges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <ChallengeCard key={item.challengeId} {...item} />
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
