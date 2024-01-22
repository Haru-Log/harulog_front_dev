import dummyImage10 from '../assets/20231020_090539.jpg'
import { Button } from "../ui/button"
import ProfileNumber from "../components/ProfilePage/ProfileNumber"
import Heatmap from "../components/ProfilePage/Heatmap";
import { useState } from "react";
import shiftDate from "../utils/shiftDate";
import { dummy_categories } from "../types/Category.type";

const today = new Date(); // dummy data용

const ProfilePage = () => {

  const [chartData, setChartData] = useState([]);

  const randomValues = getRange(51 * 7 + today.getDay() + 1).map(index => {
    return {
      date: shiftDate(new Date(), -index),
      count: getRandomInt(0, 2),
      category: dummy_categories[getRandomInt(0, 3)]?.category_name
    };
  });

  return (
    <div className="w-full flex justify-center py-16">
      <div className="w-[80%] h-full flex flex-col">
        <section className="flex h-[30%] w-full items-start">
          <div>
            <img src={dummyImage10} className="w-40 h-40 rounded-full object-cover mr-40 whitespace-nowrap" alt="Profile" />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex w-full items-baseline justify-between">
              <div className="font-bold text-3xl">
                이강혁
              </div>
              <Button className="bg-gray-400 rounded-full">프로필 편집</Button>
            </div>
            <div className="flex p-6 justify-between">
              <ProfileNumber title={"게시물"} count={6} />
              <ProfileNumber title={"챌린지"} count={4} />
              <ProfileNumber title={"팔로워"} count={1} />
              <ProfileNumber title={"팔로잉"} count={1} />
            </div>
          </div>
        </section>
        <section>
          <Heatmap data={randomValues} />
        </section>
        <section>
          피드
        </section>
      </div>
    </div>
  )
}

export default ProfilePage

function getRange(count: number) {
  return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}