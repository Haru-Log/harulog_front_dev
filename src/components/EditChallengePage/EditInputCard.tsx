import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from 'src/ui/select'
import { dummy_categories } from 'src/types/Category.type'
import { Input } from 'src/ui/input'
import { DatePickerWithRangeEdit } from 'src/ui/date-range-picker'
import { Textarea } from 'src/ui/textarea'
import { Button } from 'src/ui/button'
import { useEffect, useState } from 'react'
import { useNewChallengeStore } from 'src/zustand/newChallengeStore'
import { DateRange } from 'react-day-picker'
import { useChallengeStore } from 'src/zustand/challengeStore'
import { getTimes } from 'src/utils/getTimes'
import { getFormattedTime } from 'src/utils/getFormattedTime'

const EditInputCard = () => {
  const { newChallenge, setNewChallenge } = useNewChallengeStore();
  const challenge = useChallengeStore((state) => state.challenge);
  const [challengeCategory, setChallengeCategory] = useState(challenge.category_name);
  const [challengeTitle, setChallengeTitle] = useState(challenge.challenge_title);
  const [challengeContent, setChallengeContent] = useState(challenge.challenge_content);
  const [challengeGoal, setChallengeGoal] = useState(challenge.challenge_goal);
  const [challengeImage, setChallengeImage] = useState('');
  const [submission, setSubmission] = useState(challenge.submission);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(challenge.start_date),
    to: new Date(challenge.end_date),
  })

  const isGoalInputEnabled = !!challengeCategory;
  const times = getTimes();
  const defaultTime = challenge.challenge_goal ? getFormattedTime(challenge.challenge_goal) : '';

  useEffect(() => {
    updateNewChallenge();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengeCategory, challengeTitle, challengeContent, challengeGoal, challengeImage, submission, date]);

  const handleTimeChange = (selectedTime: string) => {
    const [hourStr, minuteStr] = selectedTime.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const totalMinutes = hour * 60 + minute;
    setChallengeGoal(totalMinutes);
  };

  const updateNewChallenge = () => {
    setNewChallenge({
      ...newChallenge,
      category_name: challengeCategory,
      challenge_title: challengeTitle,
      challenge_content: challengeContent,
      challenge_goal: challengeGoal,
      challenge_image: challengeImage,
      submission: submission,
      start_date: new Date(String(date?.from)),
      end_date: new Date(String(date?.to)),
    });
  };

  const isFieldEmpty = (value: string | number): boolean => {
    return String(value).trim() === "" || parseInt(String(value)) <= 0 || !value;
  };

  const saveButtonDisabled = (): boolean => {
    return (
      isFieldEmpty(challengeCategory) ||
      isFieldEmpty(challengeTitle) ||
      isFieldEmpty(challengeContent) ||
      isFieldEmpty(challengeGoal) ||
      isFieldEmpty(challengeImage) ||
      isFieldEmpty(submission) ||
      (date?.from === undefined || date?.to === undefined)
    );
  };

  const saveButtonOnClick = () => {
    updateNewChallenge();
    const {
      category_name,
      challenge_title,
      challenge_content,
      challenge_goal,
      challenge_image,
      submission,
      start_date,
      end_date,
    } = newChallenge;

    const formattedNewChallenge = JSON.stringify(
      {
        category_name,
        challenge_title,
        challenge_content,
        challenge_goal,
        challenge_image,
        submission,
        start_date,
        end_date,
      },
      null,
      2
    );
    alert(formattedNewChallenge);
  }


  return (
    <div className='flex flex-col mx-10 mt-10 border-2 rounded-xl px-10 py-10'>
      <div className='flex flex-row'>
        <div className='flex flex-col mr-10'>
          <div className='flex flex-row items-start'>
            <span className="font-bold mr-5 w-16">카테고리</span>
            <Select defaultValue={challenge.category_name} onValueChange={(e) => { setChallengeCategory(e) }}>
              <SelectTrigger className={`w-[280px] border-2 `}>
                <SelectValue placeholder="선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {dummy_categories.map((it) => (
                    <SelectItem value={it.category_name} key={it.category_id}>{it.category_name} </SelectItem>))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-row items-start'>
            <span className="font-bold mr-5 mt-5 w-16">목표</span>
            {challengeCategory !== '기상' ?
              <div className='flex items-baseline'>
                <Input
                  type="number"
                  placeholder={'목표 시간(분)을 입력하세요'}
                  className={`mt-5 w-[250px] border-2`}
                  defaultValue={challenge.challenge_goal}
                  onChange={(e) => {
                    setChallengeGoal(parseInt(e.target.value));
                  }} /> <span className='pl-3'> 분</span>
              </div> :
              <div className='mt-5'>
                <Select defaultValue={defaultTime} onValueChange={handleTimeChange}>
                  <SelectTrigger className={`w-[280px] border-2 `}>
                    <SelectValue placeholder="기상 시간" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Time</SelectLabel>
                      {times.map((time, index) => (
                        <SelectItem key={index} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              }
          </div>
          <div className='flex flex-row items-start'>
            <span className="font-bold mr-5 mt-5 w-16">기간</span>
            <DatePickerWithRangeEdit
              className='mt-5'
              date={date}
              setDate={(newDate) => {
                setDate(newDate);
              }}
            />
          </div>
          <div className='flex flex-row  items-baseline'>
            <span className="font-bold mr-5 mt-5 w-16">사진</span>
            <Input
              type="file"
              className={`mt-5 w-[280px] border-2 `}
              value={challengeImage}
              onChange={(e) => {
                setChallengeImage(e.target.value);
              }}
            />
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <div>
            <span className="font-bold mr-5">챌린지 제목</span>
            <Textarea
              value={challengeTitle}
              placeholder="제목을 입력해주세요."
              className={`resize-none min-h-28 min-w-32 mt-1 border-2 `}
              defaultValue={challenge.challenge_title}
              onChange={(e) => {
                setChallengeTitle(e.target.value);
              }}
            />
          </div>
          <div className='mt-3'>
            <span className="font-bold mr-5">챌린지 설명</span>
            <Textarea
              defaultValue={challenge.challenge_content}
              value={challengeContent}
              onChange={(e) => {
                setChallengeContent(e.target.value);
              }}
              placeholder="세부 사항을 입력해주세요."
              className={`resize-none min-h-32 min-w-32 mt-1 border-2 `}
            />
          </div>
          <div className='mt-3'>
            <span className="font-bold mr-5">인증 방법</span>
            <Textarea
              defaultValue={challenge.submission}
              value={submission}
              onChange={(e) => {
                setSubmission(e.target.value);
              }}
              placeholder="세부 사항을 입력해주세요."
              className={`resize-none min-h-32 min-w-32 mt-1 border-2`}
            />
          </div>
        </div>
      </div>
      <div className='flex justify-between mt-10'>
        <Button className='bg-main rounded-lg text-sm text-black w-28 py-2 hover:bg-main-hover hover:ring-2 hover:ring-main active:bg-main-active drop-shadow-md'>취소</Button>
        <Button className='bg-point rounded-lgtext-sm w-28 py-2 hover:ring-2 hover:ring-point hover:bg-point-hover active:bg-point-active drop-shadow-md disabled:bg-slate-400' disabled={saveButtonDisabled()} onClick={saveButtonOnClick}>저장</Button>
      </div>
    </div>
  )
}

export default EditInputCard
