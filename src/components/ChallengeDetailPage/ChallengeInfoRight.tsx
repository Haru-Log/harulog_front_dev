import { useChallengeStore } from 'src/zustand/challengeStore';
import { Textarea } from 'src/ui/textarea';
import { Send } from 'lucide-react';
import { Button } from 'src/ui/button';

const ChallengeInfoRight = () => {
  const challenge = useChallengeStore((state) => state.challenge);

  return (
    <div className='flex flex-col basis-3/5'>
      <div>
        <span className='font-bold text-lg mr-10 whitespace-nowrap'>챌린지 마스터</span>
        <div className='flex flex-row items-center justify-between w-full py-1 mt-3  border rounded-lg'>
          <div className='flex items-center ml-4'>
            <img src='https://i.pinimg.com/564x/32/99/a8/3299a848fb55c90ca201163f9a6abad6.jpg' alt="챌린지 마스터 이미지" className="object-cover w-12 h-12 rounded-full" />
            <span className='ml-5'>이 건</span>
          </div>
          <div className='flex flex-row items-center mr-2'>
            <Button className='bg-point rounded-lg font-bold hover:bg-point-hover active:bg-point-active'><Send color="#ffffff" className='mr-2 h-4 w-4' />메세지 보내기</Button>
          </div>
        </div>
      </div>
      <div className='mt-5'>
        <span className='font-bold text-lg mr-10 whitespace-nowrap'>챌린지 설명</span>
        <Textarea value={challenge.challenge_content} disabled className='min-h-32 mt-3' />
      </div>
      <div className='mt-5'>
        <span className='font-bold text-lg mr-10 whitespace-nowrap'>인증 방법</span>
        <Textarea value={challenge.submission} disabled className='min-h-20 mt-3' />
      </div>
    </div>
  )
}

export default ChallengeInfoRight
