import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from 'src/ui/select'
import { dummy_categories } from 'src/types/Category.type'
import { Input } from 'src/ui/input'
import { DatePickerWithRangeWithoutDefaultValue } from 'src/ui/date-range-picker'
import { Textarea } from 'src/ui/textarea'
import { Button } from 'src/ui/button'
import { useState } from 'react'
import { useChallengeStore } from 'src/zustand/newChallengeStore'
import { DateRange } from 'react-day-picker'

const CreateInputCard = () => {
  const { newChallenge, setNewChallenge } = useChallengeStore();

  const [challengeCategory, setChallengeCategory] = useState('');
  const [challengeTitle, setChallengeTitle] = useState('');
  const [challengeContent, setChallengeContent] = useState('');
  const [challengeGoal, setChallengeGoal] = useState(0);
  const [challengeImage, setChallengeImage] = useState('');
  const [submission, setSubmission] = useState('');
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(""),
    to: new Date(""),
  })

  const isGoalInputEnabled = !!challengeCategory;

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
          <div className='flex flex-row items-baseline'>
            <span className="font-bold mr-5 w-16">카테고리</span>
            <Select onValueChange={(e) => { setChallengeCategory(e); updateNewChallenge() }}>
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
          <div className='flex flex-row items-baseline'>
            <span className="font-bold mr-5 mt-5 w-16">목표</span>
            <Input
              type="number"
              placeholder={challengeCategory ? `목표 시간(분)을 입력하세요` : '카테고리를 선택하세요'}
              className={`mt-5 w-[250px] border-2 `}
              disabled={!isGoalInputEnabled}
              value={challengeGoal}
              onChange={(e) => {
                setChallengeGoal(parseInt(e.target.value));
                updateNewChallenge();
              }} />
            <span className='pl-3'> 분</span>
          </div>
          <div className='flex flex-row'>
            <span className="font-bold mr-5 mt-5 w-16">기간</span>
            <DatePickerWithRangeWithoutDefaultValue
              className='mt-5'
              date={date}
              setDate={(newDate) => {
                setDate(newDate);
                updateNewChallenge();
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
                updateNewChallenge()
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
              onChange={(e) => {
                setChallengeTitle(e.target.value);
                updateNewChallenge()
              }}
            />
          </div>
          <div className='mt-3'>
            <span className="font-bold mr-5">챌린지 설명</span>
            <Textarea
              value={challengeContent}
              onChange={(e) => {
                setChallengeContent(e.target.value);
                updateNewChallenge()
              }}
              placeholder="세부 사항을 입력해주세요."
              className={`resize-none min-h-32 min-w-32 mt-1 border-2 `}
            />
          </div>
          <div className='mt-3'>
            <span className="font-bold mr-5">인증 방법</span>
            <Textarea
              value={submission}
              onChange={(e) => {
                setSubmission(e.target.value);
                updateNewChallenge()
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

export default CreateInputCard
