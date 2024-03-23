import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal';
import { createChallenge } from '@/api/challenge/CreateChallenge';
import { imageUpload } from '@/api/challenge/ImageUpload';
import { dummy_categories } from '@/types/Category.type';
import { DatePickerWithRangeCreate } from '@/ui/date-range-picker';
import { getTimes } from '@/utils/getTimes';
import { useNewChallengeStore } from '@/zustand/newChallengeStore';
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from '@radix-ui/react-select';
import { Select } from '@/ui/select';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { Button } from '@/ui/button';

const CreateInputCard = () => {
  const { newChallenge, setNewChallenge } = useNewChallengeStore();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [file, setFile] = useState();
  const navi = useNavigate();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(''),
    to: new Date(''),
  });

  const isGoalInputEnabled = !!newChallenge.categoryName;
  const times = getTimes();

  const handleTimeChange = (selectedTime: string) => {
    const [hourStr, minuteStr] = selectedTime.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const totalMinutes = hour * 60 + minute;
    setNewChallenge({ ...newChallenge, challengeGoal: totalMinutes });
  };

  const saveButtonDisabled = (): boolean => {
    return (
      !newChallenge.categoryName ||
      !newChallenge.challengeTitle ||
      !newChallenge.challengeContent ||
      !newChallenge.challengeGoal ||
      !newChallenge.submission ||
      !newChallenge.startDate ||
      !newChallenge.endDate
    );
  };

  const onChangeImg = (e: any) => {
    e.preventDefault();
    const uploadFile = e.target.files?.[0];
    if (!uploadFile) {
      return;
    }
    setFile(uploadFile);
  };

  const saveButtonOnClick = async () => {
    if (!file) {
      alert('이미지를 업로드해주세요');
      return;
    }
    const formData = new FormData();
    formData.append('image', file);

    try {
      const responseChallenge = await createChallenge(newChallenge);
      try {
        const responseImg = await imageUpload(
          formData,
          responseChallenge.data.challengeId
        );
        console.log('이미지 업로드 성공: ', responseImg);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
      alert('Challenge created successfully!');
    } catch (error) {
      console.error('Error creating challenge:', error);
      alert('Failed to create challenge. Please try again.');
    }
    setShowConfirmation(false);
    navi('/challenge');
  };

  return (
    <div className="flex flex-col mx-10 mt-10 border-2 rounded-xl px-10 py-10">
      <div className="flex flex-row">
        <div className="flex flex-col mr-10">
          <div className="flex flex-row items-start">
            <span className="font-bold mr-5 w-16">카테고리</span>
            <Select
              onValueChange={(e) => {
                setNewChallenge({ ...newChallenge, categoryName: e });
              }}
            >
              <SelectTrigger className={`w-[280px] border-2 `}>
                <SelectValue placeholder="선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {dummy_categories.map((it) => (
                    <SelectItem value={it.category_name} key={it.category_id}>
                      {it.category_name}{' '}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row items-start">
            <span className="font-bold mr-5 mt-5 w-16">목표</span>
            {isGoalInputEnabled ? (
              newChallenge.categoryName !== '기상' ? (
                <div className="flex items-baseline">
                  <Input
                    type="number"
                    placeholder={'목표 시간(분)을 입력하세요'}
                    className={`mt-5 w-[250px] border-2`}
                    value={newChallenge.challengeGoal.toString()}
                    onChange={(e) => {
                      setNewChallenge({
                        ...newChallenge,
                        challengeGoal: parseInt(e.target.value),
                      });
                    }}
                  />{' '}
                  <span className="pl-3"> 분</span>
                </div>
              ) : (
                <div className="mt-5">
                  <Select onValueChange={handleTimeChange}>
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
              )
            ) : (
              <Input
                disabled={true}
                className={`mt-5 w-[280px] border-2`}
                value="카테고리를 선택하세요"
              />
            )}
          </div>
          <div className="flex flex-row items-start">
            <span className="font-bold mr-5 mt-5 w-16">기간</span>
            <DatePickerWithRangeCreate
              className="mt-5"
              date={date}
              setDate={(newDate) => {
                setDate(newDate);
                setNewChallenge({
                  ...newChallenge,
                  startDate: String(newDate?.from),
                  endDate: String(newDate?.to),
                });
                // console.log("convertDateFormat: ", convertDateFormat(String(newDate?.from)));
              }}
            />
          </div>
          <div className="flex flex-row items-start">
            <span className="font-bold mr-5 mt-5 w-16">사진</span>
            <Input
              type="file"
              className={`mt-5 w-[280px] border-2 `}
              accept="image/*"
              onChange={onChangeImg}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div>
            <span className="font-bold mr-5">챌린지 제목</span>
            <Textarea
              value={newChallenge.challengeTitle}
              placeholder="제목을 입력해주세요."
              className={`resize-none min-h-28 min-w-32 mt-1 border-2 `}
              onChange={(e) => {
                setNewChallenge({
                  ...newChallenge,
                  challengeTitle: e.target.value,
                });
              }}
            />
          </div>
          <div className="mt-3">
            <span className="font-bold mr-5">챌린지 설명</span>
            <Textarea
              value={newChallenge.challengeContent}
              onChange={(e) => {
                setNewChallenge({
                  ...newChallenge,
                  challengeContent: e.target.value,
                });
              }}
              placeholder="세부 사항을 입력해주세요."
              className={`resize-none min-h-32 min-w-32 mt-1 border-2 `}
            />
          </div>
          <div className="mt-3">
            <span className="font-bold mr-5">인증 방법</span>
            <Textarea
              value={newChallenge.submission}
              onChange={(e) => {
                setNewChallenge({
                  ...newChallenge,
                  submission: e.target.value,
                });
              }}
              placeholder="세부 사항을 입력해주세요."
              className={`resize-none min-h-32 min-w-32 mt-1 border-2`}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-10">
        <Button
          className="bg-main rounded-lg text-sm text-black w-28 py-2 hover:bg-main-hover hover:ring-2 hover:ring-main active:bg-main-active drop-shadow-md"
          onClick={() => navi('/challenge')}
        >
          취소
        </Button>
        <Button
          className="bg-point rounded-lgtext-sm w-28 py-2 hover:ring-2 hover:ring-point hover:bg-point-hover active:bg-point-active drop-shadow-md disabled:bg-slate-400"
          disabled={saveButtonDisabled()}
          onClick={() => setShowConfirmation(true)}
        >
          저장
        </Button>
      </div>
      {showConfirmation && (
        <ConfirmationModal
          message="챌린지를 생성하시겠습니까?"
          onConfirm={() => {
            saveButtonOnClick();
          }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default CreateInputCard;
