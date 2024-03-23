import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import ConfirmationModal from '../ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { imageUpload } from './../../api/challenge/ImageUpload';
import { editChallenge } from '@/api/challenge/EditChallenge';
import { dummy_categories } from '@/types/Category.type';
import { DatePickerWithRangeEdit } from '@/ui/date-range-picker';
import { getFormattedTime } from '@/utils/getFormattedTime';
import { getTimes } from '@/utils/getTimes';
import { useChallengeDetailStore } from '@/zustand/challengeDetailStore';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { Button } from '@/ui/button';

const EditInputCard = () => {
  const challenge = useChallengeDetailStore((state) => state.challenge);
  const setChallenge = useChallengeDetailStore((state) => state.setChallenge);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navi = useNavigate();
  const times = getTimes();
  const defaultTime = challenge.challengeGoal
    ? getFormattedTime(challenge.challengeGoal)
    : '';
  const [file, setFile] = useState();

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(challenge.startDate!),
    to: new Date(challenge.endDate!),
  });

  const saveButtonOnClick = async () => {
    try {
      await editChallenge(challenge, challenge.challengeId);
      alert('Challenge edited successfully!');

      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
          const responseImg = await imageUpload(
            formData,
            challenge.challengeId
          );
          console.log('이미지 수정 성공: ', responseImg.data.imageUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Failed to upload image. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error editing challenge:', error);
      alert('Failed to edit challenge. Please try again.');
    }
    setShowConfirmation(false);
    navi(`/challenge/${challenge.challengeId}`);
  };

  const saveButtonDisabled = (): boolean => {
    return (
      !challenge.categoryName ||
      !challenge.challengeTitle ||
      !challenge.challengeContent ||
      !challenge.challengeGoal ||
      !challenge.submission ||
      !challenge.startDate ||
      !challenge.endDate
    );
  };

  const handleTimeChange = (selectedTime: string) => {
    const [hourStr, minuteStr] = selectedTime.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const totalMinutes = hour * 60 + minute;
    setChallenge({ ...challenge, challengeGoal: totalMinutes });
  };

  const onChangeImg = (e: any) => {
    e.preventDefault();
    const uploadFile = e.target.files?.[0];
    if (!uploadFile) {
      return;
    }
    setFile(uploadFile);
  };

  return (
    <div className="flex flex-col mx-10 mt-10 border-2 rounded-xl px-10 py-10">
      <div className="flex flex-row">
        <div className="flex flex-col mr-10">
          <div className="flex flex-row items-start">
            <span className="font-bold mr-5 w-16">카테고리</span>
            <Select defaultValue={challenge.categoryName}>
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
            {challenge.categoryName !== '기상' ? (
              <div className="flex items-baseline">
                <Input
                  type="number"
                  placeholder={'목표 시간(분)을 입력하세요'}
                  className={`mt-5 w-[250px] border-2`}
                  defaultValue={challenge.challengeGoal}
                />{' '}
                <span className="pl-3"> 분</span>
              </div>
            ) : (
              <div className="mt-5">
                <Select
                  defaultValue={defaultTime}
                  onValueChange={handleTimeChange}
                >
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
            )}
          </div>
          <div className="flex flex-row items-start">
            <span className="font-bold mr-5 mt-5 w-16">기간</span>
            <DatePickerWithRangeEdit
              className="mt-5"
              date={date}
              setDate={(newDate) => {
                setDate(newDate);
                setChallenge({
                  ...challenge,
                  startDate: String(newDate?.from),
                  endDate: String(newDate?.to),
                });
              }}
            />
          </div>
          <div className="flex flex-row  items-baseline">
            <span className="font-bold mr-5 mt-5 w-16">사진</span>
            <Input
              type="file"
              className={`mt-5 w-[280px] border-2 `}
              onChange={onChangeImg}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div>
            <span className="font-bold mr-5">챌린지 제목</span>
            <Textarea
              placeholder="제목을 입력해주세요."
              className={`resize-none min-h-28 min-w-32 mt-1 border-2 `}
              defaultValue={challenge.challengeTitle}
              onChange={(e) => {
                setChallenge({ ...challenge, challengeTitle: e.target.value });
              }}
            />
          </div>
          <div className="mt-3">
            <span className="font-bold mr-5">챌린지 설명</span>
            <Textarea
              defaultValue={challenge.challengeContent}
              onChange={(e) => {
                setChallenge({
                  ...challenge,
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
              defaultValue={challenge.submission}
              onChange={(e) => {
                setChallenge({ ...challenge, submission: e.target.value });
              }}
              placeholder="세부 사항을 입력해주세요."
              className={`resize-none min-h-32 min-w-32 mt-1 border-2`}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-10">
        <Button className="bg-main rounded-lg text-sm text-black w-28 py-2 hover:bg-main-hover hover:ring-2 hover:ring-main active:bg-main-active drop-shadow-md">
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
          message="챌린지를 수정하시겠습니까?"
          onConfirm={saveButtonOnClick}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default EditInputCard;
