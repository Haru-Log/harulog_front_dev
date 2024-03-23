import { useContext, useEffect, useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import Heatmap from '../components/ProfilePage/Heatmap';
import {
  filterJandi,
  getRange,
  mergeCategory,
  mergeJandi,
  shiftDate,
} from '../utils/rawDatatoJandi';
import { Button } from '../ui/button';
import RadialChart from '../components/GrowPage/RadialChart';
import TodayChart from '../components/GrowPage/TodayChart';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import MyGoalRow from '../components/GrowPage/MyGoalRow';
import {
  GrowCategory,
  HeatmapCategory,
  Jandi,
} from '../types/HeatmapData.type';
import { fetchHeatmap } from '../api/grow/FetchHeatmap';
import { SetModalContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { fetchDaily } from '../api/grow/FetchDaily';
import { fetchGoal } from '../api/grow/FetchGoal';
import { editGoal } from '../api/grow/EditGoal';
import { fetchProfile } from '../api/profile/fetchProfile';
import GetUpRow from '../components/GrowPage/GetUpRow';

const today = new Date();

interface goalAchievementType {
  userGoal: number;
  updatedAt: Date;
  achievement: number;
}

interface GrowType {
  기상: goalAchievementType;
  공부: goalAchievementType;
  운동: goalAchievementType;
  독서: goalAchievementType;
}

const initialGoalState = {
  기상: { userGoal: 0, updatedAt: new Date(), achievement: 0 },
  공부: { userGoal: 0, updatedAt: new Date(), achievement: 0 },
  운동: { userGoal: 0, updatedAt: new Date(), achievement: 0 },
  독서: { userGoal: 0, updatedAt: new Date(), achievement: 0 },
};

const GrowPage = () => {
  const setLoginModal = useContext(SetModalContext)?.setLoginModal;
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [isEdit, setIsEdit] = useState(false); //목표 편집
  const [goal, setGoal] = useState<GrowType>(initialGoalState); //목표 리스트 저장
  const [myGoal, setMyGoal] = useState<GrowType>(initialGoalState); //목표 리스트 수정용
  const [selectedValue, setSelectedValue] = useState<HeatmapCategory>('전체'); //필터 선택
  const [allChart, setAllChart] = useState<Jandi[]>([]);
  const [chartData, setChartData] = useState<Jandi[]>(
    getRange(51 * 7 + today.getDay() + 1).map((index) => {
      return {
        date: shiftDate(new Date(), -index),
        category: {},
      };
    })
  );

  const [categoryMax, setCategoryMax] = useState<{
    공부?: number;
    운동?: number;
    독서?: number;
  }>({});

  useEffect(() => {
    const accessToken = localStorage.getItem('AccessToken');

    if (!accessToken) {
      setLoginModal(true);
      navigate('/', { replace: true });
    }

    const getGrowInfos = async () => {
      //UserInfo
      const userInfo = await fetchProfile();
      setUserName(userInfo.data.nickname);

      //Heatmap
      const heatmapRes = await fetchHeatmap();
      const heat = heatmapRes.data.map(
        (x: { activityTime: number; actegoryName: string; date: string }) => {
          return {
            ...x,
            date: new Date(x.date),
          };
        }
      );
      const merge = mergeCategory(heat);
      console.log('merge', merge);

      const mergedJandi = mergeJandi(chartData, merge.mergedJandi);
      setCategoryMax(merge.categoryMax);

      if (mergedJandi.length) {
        setAllChart(mergedJandi);
        setChartData(mergedJandi);
      }

      // User Goal
      const daily = await fetchDaily();
      console.log('daily', daily.data);

      const userGoal = await fetchGoal();
      console.log('userGoal', userGoal.data);

      const initialGoalAchi: GrowType = { ...initialGoalState };

      const wakeUptime = userGoal.data.find(
        (x: { categoryName: string; goal: number }) => x.categoryName === '기상'
      ).userGoal;

      daily.data.forEach(
        (it: {
          categoryName: string;
          userGoal: number;
          achievement: number;
          goalUpdatedAt: string;
        }) => {
          if (it.categoryName === '기상') {
            initialGoalAchi.기상 = {
              userGoal: wakeUptime,
              achievement: it.achievement,
              updatedAt: new Date(it.goalUpdatedAt),
            };
          } else {
            initialGoalAchi[it.categoryName as GrowCategory] = {
              userGoal: it.userGoal,
              achievement: it.achievement,
              updatedAt: new Date(it.goalUpdatedAt),
            };
          }
        }
      );

      setGoal(initialGoalAchi);
      setMyGoal(initialGoalAchi);
    };
    getGrowInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 전체 필터링을 위한 작업
  useEffect(() => {
    if (selectedValue === '전체' && allChart.length) {
      setChartData(allChart);
    } else if (allChart.length) {
      setChartData(filterJandi(allChart, selectedValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  useEffect(() => {
    setMyGoal(goal);
  }, [goal]);

  const sendEditedGoal = async () => {
    const editData = {
      updateGoalsList: [
        {
          categoryName: '운동',
          goal: myGoal.운동.userGoal,
        },
        {
          categoryName: '기상',
          goal: myGoal.기상.userGoal,
        },
        {
          categoryName: '공부',
          goal: myGoal.공부.userGoal,
        },
        {
          categoryName: '독서',
          goal: myGoal.독서.userGoal,
        },
      ],
    };

    const response = await editGoal(editData);

    console.log(response.data);

    if (response.message === 'OK') {
      alert('수정 완료');
      const tempGoal = { ...goal };
      response.data.forEach(
        (it: { categoryName: string; userGoal: number; updatedAt: string }) => {
          if (it.categoryName === '기상') {
            tempGoal.기상 = {
              ...tempGoal.기상,
              userGoal: it.userGoal,
              updatedAt: new Date(it.updatedAt),
            };
          } else {
            tempGoal[it.categoryName as GrowCategory] = {
              ...tempGoal[it.categoryName as GrowCategory],
              userGoal: it.userGoal,
              updatedAt: new Date(it.updatedAt),
            };
          }
        }
      );
      setGoal({ ...tempGoal });
      setMyGoal({ ...tempGoal });
    } else {
      alert('수정 실패');
    }
  };

  const handleSubmit = () => {
    if (isEdit) {
      sendEditedGoal();
    }
    setIsEdit(!isEdit);
    // 새로고침? 해서 다시 요청 받기
  };

  return (
    <div className="w-full h-full p-10 font-ibm">
      <section className="flex">
        <div className="w-full flex items-baseline">
          <div className="text-2xl font-bold mr-1 whitespace-nowrap">
            {userName}
          </div>
          <div className="text-xl font-bold whitespace-nowrap">
            님, 오늘도 힘찬 하루 되세요!👏
          </div>
        </div>
        <ToggleGroup
          type="single"
          value={selectedValue}
          onValueChange={(e) => {
            setSelectedValue(e as HeatmapCategory);
          }}
          className="flex"
        >
          <ToggleGroupItem value="전체" className="whitespace-nowrap">
            전체
          </ToggleGroupItem>
          <ToggleGroupItem value="공부" className="whitespace-nowrap">
            공부
          </ToggleGroupItem>
          <ToggleGroupItem value="운동" className="whitespace-nowrap">
            운동
          </ToggleGroupItem>
          <ToggleGroupItem value="독서" className="whitespace-nowrap">
            독서
          </ToggleGroupItem>
          <ToggleGroupItem value="기상" className="whitespace-nowrap">
            기상
          </ToggleGroupItem>
        </ToggleGroup>
      </section>
      <section className="flex flex-col pt-10">
        <Heatmap data={chartData} categoryMax={categoryMax} />
      </section>
      <section className="border-2 rounded-xl w-full">
        <div className="flex justify-between">
          <div className="text-3xl font-bold m-5">DAILY</div>
          <Button
            className="bg-main rounded-xl text-sm font-bold text-black hover:bg-main-hover hover:ring-2 hover:ring-main active:bg-main-active drop-shadow-md m-5"
            onClick={handleSubmit}
          >
            {isEdit ? '수정 완료' : '목표 수정'}
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-center h-full w-1/3">
            <div className="flex justify-between">
              <RadialChart
                key="Radial기상"
                category="기상"
                goal={
                  (new Date().getTime() - goal.기상!.updatedAt.getTime()) /
                  (1000 * 60 * 60 * 24)
                }
                achievement={goal.기상?.achievement}
                theme={'#F0E57F'}
              />
              <RadialChart
                key={'Radial공부'}
                category={'공부'}
                goal={goal.공부?.userGoal}
                achievement={goal.공부?.achievement}
                theme={'#87b7ff'}
              />
            </div>
            <div className="flex justify-between">
              <RadialChart
                key={'Radial운동'}
                category={'운동'}
                goal={goal.운동?.userGoal}
                achievement={goal.운동?.achievement}
                theme={'#b1d9aa'}
              />
              <RadialChart
                key={'Radial독서'}
                category={'독서'}
                goal={goal.독서?.userGoal}
                achievement={goal.독서?.achievement}
                theme={'#fd8446'}
              />
            </div>
          </div>
          <div className="w-1/3 h-full">
            <TodayChart category={'Today'} goals={goal} theme={'#92C7CF'} />
          </div>
          <div className="pr-7 h-full flex items-center w-2/5">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#92C7CF]  hover:bg-[#92C7CF] text-2xl whitespace-nowrap hover:text-black border-b-4">
                  <TableHead className="w-40 rounded-tl-2xl"></TableHead>
                  <TableHead className="w-96 text-white font-bold text-center">
                    나의 목표
                  </TableHead>
                  <TableHead className="font-bold w-40 text-white text-center">
                    오늘 성취
                  </TableHead>
                  <TableHead className="rounded-tr-2xl font-bold w-40 text-white text-center">
                    시작일
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <GetUpRow
                  key="Row기상"
                  isEdit={isEdit}
                  {...myGoal.기상}
                  setMyGoal={setMyGoal}
                  myGoal={myGoal}
                  isLastRow={false}
                  category="기상"
                />
                <MyGoalRow
                  key="Row공부"
                  isEdit={isEdit}
                  {...myGoal.공부}
                  setMyGoal={setMyGoal}
                  myGoal={myGoal}
                  isLastRow={false}
                  category="공부"
                />
                <MyGoalRow
                  key="Row운동"
                  isEdit={isEdit}
                  {...myGoal.운동}
                  setMyGoal={setMyGoal}
                  myGoal={myGoal}
                  isLastRow={false}
                  category="운동"
                />
                <MyGoalRow
                  key="Row독서"
                  isEdit={isEdit}
                  {...myGoal.독서}
                  setMyGoal={setMyGoal}
                  myGoal={myGoal}
                  isLastRow={true}
                  category="독서"
                />
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
      {/* <section className="border-2 rounded-xl w-full mt-5">
        <div className="text-3xl font-bold m-5">
          MONTHLY
        </div>
        <MonthlyChart />
      </section> */}
    </div>
  );
};

export default GrowPage;
