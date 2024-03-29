import { Button } from "../ui/button"
import ProfileNumber from "../components/ProfilePage/ProfileNumber"
import Heatmap from "../components/ProfilePage/Heatmap";
import { useEffect, useState } from "react";
import { Archive, Mountain, UserPlus, XCircle } from "lucide-react";
import FeedCard from "../components/Feed/Cards";
import { FeedItem } from "../types/FeedItem.type";
import { getRange, mergeCategory, mergeJandi, shiftDate } from "../utils/rawDatatoJandi";
import { Link, useParams } from 'react-router-dom';
import ProfileChallengeCard from '../components/ProfilePage/ProfileChallengeCard';
import { Jandi } from "../types/HeatmapData.type";
import { fetchProfile } from "../api/profile/fetchProfile";
import { fetchHeatmap } from "../api/grow/FetchHeatmap";
import { fetchFeedAll } from "../api/feed/FetchFeedAll";
import { useChallengeAllStore } from "../zustand/challengeAllStore";
import { fetchChallengeProfile } from "../api/challenge/FetchChallengeProfile";
import ConfirmationModal from "../components/ConfirmationModal";
import { actionFollow } from "../api/follow/ActionFollow";
import { cancelFollow } from "../api/follow/CancelFollow";
import { fetchImgFromFirebase } from "../api/fetchImgFirebase";

const today = new Date(); // dummy data용

const ProfilePage = () => {

  const nickname = useParams().nickname || localStorage.getItem('nickname');
  const myName = localStorage.getItem('nickname');
  const [userProfile, setUserProfile] = useState<any>();
  const [feed, setFeed] = useState<FeedItem[]>([])
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [chartData, setChartData] = useState<Jandi[]>(
    getRange(51 * 7 + today.getDay() + 1).map(index => {
      return {
        date: shiftDate(new Date(), -index),
        category: {},
      };
    })
  );
  const [categoryMax, setCategoryMax] = useState<{
    "기상"?: number;
    "공부"?: number;
    "운동"?: number;
    "독서"?: number;
  }>({})
  const fetchChallenges = useChallengeAllStore(state => state.setChallenge);
  const [followState, setFollowState] = useState(false);

  useEffect(() => {
    const getUserProfile = async () => {
      const userInfo = await fetchProfile(nickname);
      const imgUrl = await fetchImgFromFirebase(userInfo.data.imageUrl)
      setUserProfile({ ...userInfo.data, imageUrl: imgUrl })
      setFollowState(userInfo.data.following)

      //Heatmap
      const heatmap = await fetchHeatmap(nickname);
      const heat = heatmap.data.map((x: any) => {
        return {
          ...x,
          date: new Date(x.date)
        }
      })

      const merge = mergeCategory(heat)

      const mergedJandi = mergeJandi(chartData, merge.mergedJandi)
      setCategoryMax(merge.categoryMax)
      setChartData(mergedJandi)

      const response = await fetchFeedAll();
      const myFeed = response.data.filter((x: FeedItem) => x.nickname === nickname)
      setFeed(myFeed);

      try {
        const response = await fetchChallengeProfile(nickname);
        //내가 참여중인 챌린지만 가져오는 api로 변경해야함
        fetchChallenges(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickname])

  const [feedToggle, setFeedToggle] = useState(false);
  const challenge = useChallengeAllStore(state => state.challenge);

  const handleActionFollow = async () => {
    await actionFollow(nickname);
    window.location.reload();
  }

  const handleCancelFollow = async () => {
    await cancelFollow(nickname);
    window.location.reload();
  }

  return (
    <div className="w-full flex justify-center py-16 font-ibm">
      <div className="w-[80%] h-full flex flex-col">
        <div className="flex flex-col">
          <section className="flex w-full items-start">
            <div className="max-w-40 max-h-40 justify-center h-fit mr-5">
              <img src={userProfile && userProfile.imageUrl} className="w-40 h-40 rounded-full object-fill mr-40 whitespace-nowrap" alt="Profile" />
            </div>
            <div className="flex flex-col w-full">
              <div className="flex w-full items-baseline justify-between">
                <div className="font-bold text-3xl">
                  {userProfile && userProfile.nickname}
                </div>
                {(nickname === myName) ? <Button className="bg-point hover:bg-point-hover active:bg-point-active shadow-xl rounded-full">
                  <Link to={'/profile/edit'}>
                    <span className='font-bold'>프로필 편집</span>
                  </Link>
                </Button>
                  : <Button className="bg-point hover:bg-point-hover active:bg-point-active shadow-xl rounded-xl font-bold"
                    onClick={() => setShowConfirmation(true)}>
                    {followState ? <><XCircle color="#ffffff" className='mr-2 h-5 w-5' /><p>팔로우 취소</p></> : <><UserPlus color="#ffffff" className='mr-2 h-5 w-5' /><p>팔로우</p></>}
                  </Button>}
              </div>
              <div className="flex p-6 justify-between">
                <ProfileNumber title={"게시물"} count={feed.length} />
                <ProfileNumber title={"챌린지"} count={challenge.length} />
                <ProfileNumber title={"팔로워"} count={userProfile && userProfile.followerCount} />
                <ProfileNumber title={"팔로잉"} count={userProfile && userProfile.followingCount} />
              </div>
            </div>
          </section>
          <div className="px-5 mb-5">
            {userProfile?.introduction}
          </div>
        </div>
        <section>
          <Heatmap data={chartData} categoryMax={categoryMax} />
        </section>
        <section className="w-full h-full">
          <div className="w-full flex justify-between">
            <div
              className={`w-full h-fit flex justify-center p-2 cursor-pointer items-center ${!feedToggle ? 'border-t-2 border-black font-bold' : 'border-t border-t-gray-400 text-gray-400'}`}
              onClick={() => setFeedToggle(false)}
            >
              <Archive className="mr-2" strokeWidth={2.5} size={32} />피드
            </div>
            <div
              className={`w-full h-fit flex justify-center p-2 cursor-pointer items-center  ${feedToggle ? 'border-t-2 border-black font-bold' : 'border-t border-t-gray-400 text-gray-400'}`}
              onClick={() => setFeedToggle(true)}
            >
              <Mountain className="mr-2" strokeWidth={2.5} size={32} />챌린지
            </div>
          </div>
          <div className='flex flex-col items-center'>
            {feedToggle ?
              (challenge?.length > 0 ? <ProfileChallengeCard challenge={challenge} /> : <></>)
              :
              (feed?.length > 0 ? <FeedCard data={feed} /> : <></>)
            }
          </div>
        </section>
      </div>
      {showConfirmation && (
        <ConfirmationModal
          message={followState ? "정말 팔로우를 취소하시겠습니까?" : "정말 팔로우 하시겠습니까?"}
          onConfirm={() => { followState ? handleCancelFollow() : handleActionFollow(); setShowConfirmation(false) }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  )
}

export default ProfilePage