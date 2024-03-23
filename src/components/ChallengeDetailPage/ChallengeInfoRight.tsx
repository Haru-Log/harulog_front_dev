import { Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Textarea } from '@/ui/textarea';
import { Button } from '@/ui/button';
import getLeaderName from '@/utils/getLeaderName';
import getLeaderProfile from '@/utils/getLeaderProfile';
import { useChallengeDetailStore } from '@/zustand/challengeDetailStore';

const ChallengeInfoRight = () => {
  const challenge = useChallengeDetailStore((state) => state.challenge);

  const [profileImg, setProfileImg] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getLeaderProfile(challenge);
      setProfileImg(res);
    };
    fetchProfile();
  }, [challenge]);

  return (
    <div className="flex flex-col w-full min-w-72">
      <div>
        <span className="font-bold text-lg mr-10 whitespace-nowrap">
          챌린지 마스터
        </span>
        <div className="flex flex-row items-center justify-between w-full py-1 mt-3  border rounded-lg">
          <div className="flex items-center ml-4">
            <img
              src={profileImg}
              alt="챌린지 마스터 이미지"
              className="object-cover w-12 h-12 rounded-full"
            />
            <span className="ml-5 font-semibold">
              {getLeaderName(challenge)}
            </span>
          </div>
          <div className="flex flex-row items-center mr-2">
            <Button className="bg-point rounded-lg font-bold hover:bg-point-hover active:bg-point-active">
              <Send color="#ffffff" className="mr-2 h-4 w-4" />
              메세지 보내기
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <span className="font-bold text-lg mr-10 whitespace-nowrap">
          챌린지 설명
        </span>
        <Textarea
          value={challenge.challengeContent}
          disabled
          className="resize-none min-h-32 mt-3"
        />
      </div>
      <div className="mt-5">
        <span className="font-bold text-lg mr-10 whitespace-nowrap">
          인증 방법
        </span>
        <Textarea
          value={challenge.submission}
          disabled
          className="resize-none min-h-28 mt-3"
        />
      </div>
    </div>
  );
};

export default ChallengeInfoRight;
