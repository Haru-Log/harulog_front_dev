import dummyChallengeMemberData from 'src/types/ChallengeMember.dummy'
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
const ChallengeMemberList = () => {
  return (
    <div className='border-2 rounded-xl mt-7 mb-20 px-10 py-6'>
      <span className='text-xl font-bold'>참여하는 사람들</span>
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
        {dummyChallengeMemberData.map((member, index) => (
          <TableRow key={index}>
            <TableCell className="w-[100px]">
              <img src={member.profileImage} alt={`profile-img-${index}`} className='rounded-full w-12'></img>
            </TableCell>
            <TableCell className='w-[80px]'>{member.name}</TableCell>
            <TableCell>({member.status})</TableCell>
            <TableCell className="text-right w-[90px]">
              <div className={`text-white text-xs text-center font-bold w-fit h-fit px-3 py-3 rounded-lg shadow-sm ${member.dailyAchievement === '달성 완료' ? 'bg-green-300' : 'bg-yellow-300'} whitespace-nowrap`}>
                {member.dailyAchievement}
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
  )
}

export default ChallengeMemberList
