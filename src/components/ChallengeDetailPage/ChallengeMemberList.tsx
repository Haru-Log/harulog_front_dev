import { joinChallenge } from 'src/api/challenge/JoinChallenge'
import { UserPlus } from 'lucide-react'
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
const ChallengeMemberList = () => {
  const challenge = useChallengeDetailStore((state) => state.challenge);
  const amIJoined = false;

  const handleJoinChallenge = async() => {
    try {
      await joinChallenge(challenge.challengeId);
      alert('Challenge joined successfully!');
    } catch (error) {
      console.error('Error joining challenge:', error);
      alert('Failed to join challenge. Please try again.');
    }
  }

  return (
    <div className='relative flex flex-col mt-10 mb-20 border-2 rounded-xl px-10 py-10'>
      {!amIJoined && (
        <div className="absolute inset-10 flex items-center justify-center z-50 blur-none">
          <Button className="bg-point text-white py-2 px-4 rounded-lg font-semibold shadow-lg hover:bg-point-hover active:bg-point-active" onClick={handleJoinChallenge}>
            챌린지 참여하기
          </Button>
        </div>
      )}
      <span className='text-xl font-bold'>참여하는 사람들</span>

      <div className={` ${amIJoined ? '' : 'blur-sm'}`}>
        <Table className='mt-5'>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">프로필</TableHead>
              <TableHead className='w-[80px]'>이름</TableHead>
              <TableHead>현황</TableHead>
              <TableHead>일일 달성</TableHead>
              <TableHead>팔로우</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {challenge.challengeUserList?.map((member, index) => (
              <TableRow key={index}>
                <TableCell className="w-[100px]">
                  <img src={member.imageUrl} alt={`profile-img-${index}`} className='rounded-full w-12'></img>
                </TableCell>
                <TableCell className='w-[80px]'>{member.nickname}</TableCell>
                <TableCell>{member.status}</TableCell>
                <TableCell className="text-right w-[90px]">
                  <div className={`text-white text-xs text-center font-bold w-fit h-fit px-3 py-3 rounded-lg shadow-sm ${member.dailyAchievement === true ? 'bg-green-300' : 'bg-yellow-300'} whitespace-nowrap`}>
                    {member.dailyAchievement ? '달성 완료' : '미달성'}
                  </div>
                </TableCell>
                <TableCell className="text-right w-[90px]">
                  <Button className='bg-point rounded-lg font-bold shadow-sm hover:bg-point-hover active:bg-point-active'>
                    <UserPlus color="#ffffff" className='mr-2 h-5 w-5' />팔로우
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>

    </div>
  )
}

export default ChallengeMemberList
