import { useEffect, useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import Heatmap from "../components/ProfilePage/Heatmap";
import { Jandi } from "../types/HeatmapData.type";
import { filterJandi, getRange, mergeCategory, mergeJandi, shiftDate } from "../utils/rawDatatoJandi";
import dummy_jandi from "../types/HeatmapData.dummy";
import { Button } from "../ui/button"


const today = new Date(); // dummy data용



const GrowPage = () => {

  const [selectedValue, setSelectedValue] = useState("전체");
  const [chartData, setChartData] = useState<Jandi[]>(
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
      <section className="border-2 rounded-xl w-full p-5">
        <div className="flex justify-between">
          <div className="text-3xl font-bold ">
            Daily
          </div>
          <Button className="bg-main rounded-xl text-sm font-bold text-black hover:bg-main-hover hover:ring-2 hover:ring-main active:bg-main-active drop-shadow-md">
            목표 수정
          </Button>
        </div>
        <div className="flex justify-between">
          <div>
            카테고리별 차트
          </div>
          <div>
            오늘 성취도
          </div>
          <div>
            목표
          </div>
        </div>
      </section>
      <section>
        달 성취칸
      </section>
    </div>
  )
}

export default GrowPage
