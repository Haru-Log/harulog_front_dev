import { useEffect, useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import Heatmap from "../components/ProfilePage/Heatmap";
import { Jandi } from "../types/HeatmapData.type";
import { filterJandi, getRange, mergeCategory, mergeJandi, shiftDate } from "../utils/rawDatatoJandi";
import dummy_jandi from "../types/HeatmapData.dummy";
import { Button } from "../ui/button"
import RadialChart from "../components/GrowPage/RadialChart";
import TodayChart from "../components/GrowPage/TodayChart";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "../ui/table";
import { Input } from "../ui/input";

const today = new Date(); // dummy data용

const dummy_goal = [
  {
    category: "운동",
    goal: 60
  },
  {
    category: "기상",
    goal: 30
  },
  {
    category: "공부",
    goal: 390
  },
  {
    category: "독서",
    goal: 100
  }
]

const GrowPage = () => {

  const [isEdit, setIsEdit] = useState(false); //목표 편집
  const [goal, setGoal] = useState<{ category: string, goal: number }[]>([])  //목표 리스트 저장
  const [selectedValue, setSelectedValue] = useState("전체"); //필터 선택
  const [chartData, setChartData] = useState<Jandi[]>( //잔디밭 값 초기화
    getRange(51 * 7 + today.getDay() + 1).map(index => {
      return {
        date: shiftDate(new Date(), -index),
        category: [""]
      };
    })
  );
  const [allChart, setAllChart] = useState<Jandi[]>([])

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
    setGoal(dummy_goal);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 전체 필터링을 위한 작업
  useEffect(() => {
    if (selectedValue === '전체' && allChart.length) {
      setChartData(allChart);
    }
    else if (allChart.length) {
      setChartData(filterJandi(allChart, selectedValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue])

  return (
    <div className="w-full h-full p-10">
      <section className="flex items-baseline">
        <div className="text-2xl font-bold mr-1">사용자이름</div>
        <div className="text-xl font-bold">님, 오늘도 힘찬 하루 되세요!👏</div>
      </section>
      <section className="flex pt-10">
        <ToggleGroup type="single" value={selectedValue} onValueChange={setSelectedValue} className='flex flex-col pb-10'>
          <ToggleGroupItem value="전체" className="whitespace-nowrap">전체</ToggleGroupItem>
          <ToggleGroupItem value="공부" className="whitespace-nowrap">공부</ToggleGroupItem>
          <ToggleGroupItem value="운동" className="whitespace-nowrap">운동</ToggleGroupItem>
          <ToggleGroupItem value="독서" className="whitespace-nowrap">독서</ToggleGroupItem>
          <ToggleGroupItem value="기상" className="whitespace-nowrap">기상</ToggleGroupItem>
        </ToggleGroup>
        <Heatmap data={chartData} />
      </section>
      <section className="border-2 rounded-xl w-full">
        <div className="flex justify-between">
          <div className="text-3xl font-bold m-5">
            DAILY
          </div>
          <Button className="bg-main rounded-xl text-sm font-bold text-black hover:bg-main-hover hover:ring-2 hover:ring-main active:bg-main-active drop-shadow-md m-5"
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? "수정 완료" : "목표 수정"}
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-center">
            <div className="flex justify-between">
              <RadialChart category={"기상"} goal={goal.find(x => x.category === "기상")?.goal} achievement={26} theme={"#F0E57F"} />
              <RadialChart category={"공부"} goal={goal.find(x => x.category === "공부")?.goal} achievement={10} theme={"#87b7ff"} />
            </div>
            <div className="flex justify-between">
              <RadialChart category={"운동"} goal={goal.find(x => x.category === "운동")?.goal} achievement={83} theme={"#b1d9aa"} />
              <RadialChart category={"독서"} goal={goal.find(x => x.category === "독서")?.goal} achievement={19} theme={"#fd8446"} />
            </div>
          </div>
          <div>
            <TodayChart category={"Today"} goal={60} achievement={10} theme={"#92C7CF"} />
          </div>
          <div className="pr-20 h-full flex items-center">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#92C7CF] text-2xl">
                  <TableHead className="w-40 rounded-tl-2xl"></TableHead>
                  <TableHead className="w-40 text-white font-bold text-center">나의 목표</TableHead>
                  <TableHead className="rounded-tr-2xl font-bold w-40 text-white text-center">누적</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  goal.map((x, idx) => {
                    return (
                      <TableRow className={`text-2xl text-center ${idx % 2 && 'bg-[#92C7CF] text-white'}`}>
                        <TableCell className={`font-bold whitespace-nowrap text-center ${(idx === goal.length - 1) && 'rounded-bl-2xl'}`}>{x.category}</TableCell>
                        <TableCell>
                          {isEdit ?
                            <Input />
                            : x.goal
                          }
                        </TableCell>
                        <TableCell className={`${idx === goal.length - 1 && "rounded-br-2xl"}`}>1000</TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
      <section className="border-2 rounded-xl w-full">
        <div className="text-3xl font-bold m-5">
          DAILY
        </div>
      </section>
    </div>
  )
}

export default GrowPage
