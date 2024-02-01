import { useEffect, useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import Heatmap from "../components/ProfilePage/Heatmap";
import { Jandi } from "../types/HeatmapData.type";
import { filterJandi, getRange, mergeCategory, mergeJandi, shiftDate } from "../utils/rawDatatoJandi";
import dummy_jandi from "../types/HeatmapData.dummy";
import { Button } from "../ui/button"
import RadialChart from "../components/GrowPage/RadialChart";
import TodayChart from "../components/GrowPage/TodayChart";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table";
import MonthlyChart from "../components/GrowPage/MonthlyChart";
import MyGoalRow from "../components/GrowPage/MyGoalRow";

const today = new Date(); // dummy data용

const initialGoalState = [
  { category: "기상", goal: 0, updatedAt: new Date() },
  { category: "공부", goal: 0, updatedAt: new Date() },
  { category: "운동", goal: 0, updatedAt: new Date() },
  { category: "독서", goal: 0, updatedAt: new Date() }
]

const dummy_goal = [
  { category: "기상", goal: 390, updatedAt: new Date('2024-01-01') },
  { category: "공부", goal: 180, updatedAt: new Date('2024-01-01') },
  { category: "운동", goal: 60, updatedAt: new Date('2024-01-01') },
  { category: "독서", goal: 100, updatedAt: new Date('2024-01-01') }
]

const initialAchievementState = [
  { category: "기상", achievement: 0 },
  { category: "공부", achievement: 0 },
  { category: "운동", achievement: 0 },
  { category: "독서", achievement: 0 }
]

const dummy_achievement = [
  { category: "기상", achievement: 10 },
  { category: "공부", achievement: 95 },
  { category: "운동", achievement: 60 },
  { category: "독서", achievement: 100 }
]

const chartTheme = [
  "#F0E57F", "#87b7ff", "#b1d9aa", "#fd8446"
]

const GrowPage = () => {

  const [isEdit, setIsEdit] = useState(false); //목표 편집
  const [goal, setGoal] = useState<{ category: string, goal: number, updatedAt: Date }[]>(initialGoalState)  //목표 리스트 저장
  const [myGoal, setMyGoal] = useState<{ category: string, goal: number, updatedAt: Date }[]>(initialGoalState)  //목표 리스트 수정용
  const [achievement, setAchievement] = useState<{ category: string, achievement: number }[]>(initialAchievementState)
  const [selectedValue, setSelectedValue] = useState("전체"); //필터 선택
  const [allChart, setAllChart] = useState<Jandi[]>([])
  const [chartData, setChartData] = useState<Jandi[]>( //잔디밭 값 초기화
    getRange(51 * 7 + today.getDay() + 1).map(index => {
      return {
        date: shiftDate(new Date(), -index),
        category: [""]
      };
    })
  );



  useEffect(() => {
    dummy_jandi.sort((a, b) => a.date.getTime() - b.date.getTime());
    const mergedJandi = mergeJandi(chartData, mergeCategory(dummy_jandi))

    if (mergedJandi.length) {
      setAllChart(mergedJandi)

      //set으로 하는게 버전이 안 맞아서 일단 이렇게 중복 제거 했습니다.
      setChartData(mergedJandi.map((it) => {
        let tmp: string[] = [];
        for (let i of it.category) {
          if (!tmp.includes(i)) {
            tmp.push(i)
          }
        }
        return { ...it, category: tmp }
      }));
    }

    // 목표 설정하기
    setGoal([...dummy_goal]);
    // 성취 설정하기
    setAchievement([...dummy_achievement])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 전체 필터링을 위한 작업
  useEffect(() => {
    if (selectedValue === '전체' && allChart.length) {
      setChartData(allChart.map((it) => {
        let tmp: string[] = [];
        for (let i of it.category) {
          if (!tmp.includes(i)) {
            tmp.push(i)
          }
        }
        return { ...it, category: tmp }
      }));
    }
    else if (allChart.length) {
      setChartData(filterJandi(allChart, selectedValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue])

  useEffect(() => {
    setMyGoal(goal)
  }, [goal])

  const handleSubmit = () => {
    setIsEdit(!isEdit)
    setGoal(myGoal.map((x, idx) => {
      if (goal[idx].goal !== x.goal) {
        x.updatedAt = new Date()
      }
      return x
    }))
  }

  return (
    <div className="w-full h-full p-10 font-ibm">
      <section className="flex">
        <div className="w-full flex items-baseline">
          <div className="text-2xl font-bold mr-1 whitespace-nowrap">사용자이름</div>
          <div className="text-xl font-bold whitespace-nowrap">님, 오늘도 힘찬 하루 되세요!👏</div>
        </div>
        <ToggleGroup type="single" value={selectedValue} onValueChange={setSelectedValue} className='flex'>
          <ToggleGroupItem value="전체" className="whitespace-nowrap">전체</ToggleGroupItem>
          <ToggleGroupItem value="공부" className="whitespace-nowrap">공부</ToggleGroupItem>
          <ToggleGroupItem value="운동" className="whitespace-nowrap">운동</ToggleGroupItem>
          <ToggleGroupItem value="독서" className="whitespace-nowrap">독서</ToggleGroupItem>
          <ToggleGroupItem value="기상" className="whitespace-nowrap">기상</ToggleGroupItem>
        </ToggleGroup>
      </section>
      <section className="flex flex-col pt-10">
        <Heatmap data={chartData} />
      </section>
      <section className="border-2 rounded-xl w-full">
        <div className="flex justify-between">
          <div className="text-3xl font-bold m-5">
            DAILY
          </div>
          <Button className="bg-main rounded-xl text-sm font-bold text-black hover:bg-main-hover hover:ring-2 hover:ring-main active:bg-main-active drop-shadow-md m-5"
            onClick={handleSubmit}
          >
            {isEdit ? "수정 완료" : "목표 수정"}
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-center">
            <div className="flex justify-between">
              {
                achievement.slice(0, 2).map((it, idx) => (
                  <RadialChart
                    key={idx}
                    category={it.category}
                    goal={it.category === '기상' ?
                      (new Date().getTime() - goal[idx].updatedAt.getTime()) / (1000 * 60 * 60 * 24) : goal[idx].goal}
                    achievement={it.achievement}
                    theme={chartTheme[idx]}
                  />
                ))
              }
            </div>
            <div className="flex justify-between">
              {
                achievement.slice(2, 4).map((it, idx) => (
                  <RadialChart
                    key={idx + 2}
                    category={it.category}
                    goal={goal[idx + 2].goal}
                    achievement={it.achievement}
                    theme={chartTheme[idx + 2]}
                  />
                ))
              }
            </div>
          </div>
          <div>
            <TodayChart
              category={"Today"} goals={goal} achievements={achievement} theme={"#92C7CF"} />
          </div>
          <div className="pr-20 h-full flex items-center">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#92C7CF] text-2xl whitespace-nowrap hover:text-black border-b-4">
                  <TableHead className="w-40 rounded-tl-2xl"></TableHead>
                  <TableHead className="w-40 text-white font-bold text-center">나의 목표</TableHead>
                  <TableHead className="font-bold w-40 text-white text-center">오늘 성취</TableHead>
                  <TableHead className="rounded-tr-2xl font-bold w-40 text-white text-center">시작일</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  myGoal.map((x, idx) =>
                    <MyGoalRow key={idx} isEdit={isEdit} {...x} idx={idx} setMyGoal={setMyGoal} myGoal={myGoal}
                      achievement={achievement[idx].achievement} isLastRow={idx === goal.length - 1}
                    />
                  )
                }
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
      <section className="border-2 rounded-xl w-full mt-5">
        <div className="text-3xl font-bold m-5">
          MONTHLY
        </div>
        <MonthlyChart />
      </section>
    </div>
  )
}

export default GrowPage
