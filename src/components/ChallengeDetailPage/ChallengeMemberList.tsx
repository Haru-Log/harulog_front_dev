import { joinChallenge } from 'src/api/challenge/JoinChallenge'
import { UserSearch } from 'lucide-react'
import { Button } from 'src/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/ui/table"
import { useChallengeDetailStore } from 'src/zustand/challengeDetailStore'
import { useState } from 'react'
import ConfirmationModal from '../ConfirmationModal'
import ChallengeMemberProfile from "./ChallengeMemberProfile"
import { useNavigate } from 'react-router-dom'
const ChallengeMemberList = () => {
  const challenge = useChallengeDetailStore((state) => state.challenge);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navi = useNavigate();
  console.log()
  const handleJoinChallenge = async () => {
    try {
      await joinChallenge(challenge.challengeId);
      alert('Challenge joined successfully!');
    } catch (error) {
      console.error('Error joining challenge:', error);
      alert('Failed to join challenge. Please try again.');
    }
    setShowConfirmation(false);
    window.location.reload();
  }

  return (
    <div className='relative flex flex-col mt-10 mb-20 border-2 rounded-xl px-10 py-10'>
      {!challenge.participate && (
        <div className="absolute inset-10 flex items-center justify-center z-50 blur-none">
          <Button className="bg-point text-white py-2 px-4 rounded-lg font-semibold shadow-lg hover:bg-point-hover active:bg-point-active" onClick={() => setShowConfirmation(true)}>
            챌린지에 참여해보세요!
          </Button>
        </div>
      )}
      <span className='text-xl font-bold'>참여하는 사람들</span>

      <div className={` ${challenge.participate ? '' : 'blur-sm'}`}>
        <Table className='mt-5'>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">프로필</TableHead>
              <TableHead className='w-[80px]'>이름</TableHead>
              <TableHead>현황</TableHead>
              <TableHead>일일 달성</TableHead>
              <TableHead>프로필</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {challenge.challengeUserList?.map((member, index) => (
              <TableRow key={index}>
                <TableCell className="w-[100px]">
                  <ChallengeMemberProfile key={member.nickname + index} imgUrl={member.imageUrl} index={index} />
                </TableCell>
                <TableCell className='w-[80px] font-semibold'>{member.nickname}</TableCell>
                <TableCell>{member.status}</TableCell>
                <TableCell className="text-right w-[90px]">
                  <div className={`text-white text-xs text-center font-bold w-fit h-fit px-3 py-3 rounded-lg shadow-sm ${member.dailyAchievement === true ? 'bg-green-300' : 'bg-yellow-300'} whitespace-nowrap`}>
                    {member.dailyAchievement ? '달성 완료' : '미달성'}
                  </div>
                </TableCell>
                <TableCell className="text-right w-[90px]">
                  <Button className='bg-point rounded-lg font-bold shadow-sm hover:bg-point-hover active:bg-point-active'
                    onClick={() => navi(`/profile/${member.nickname}`)}>
                    <UserSearch color="#ffffff" className='mr-2 h-5 w-5' />프로필
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>
      {showConfirmation && (
        <ConfirmationModal
          message="챌린지에 참여하시겠습니까?"
          onConfirm={handleJoinChallenge}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  )
}

export default ChallengeMemberList
