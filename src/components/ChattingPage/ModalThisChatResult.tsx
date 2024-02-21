import { useContentStore } from 'src/zustand/searchUserStore';
import { Table, TableBody, TableCell, TableRow } from 'src/ui/table';
import { Button } from 'src/ui/button';
import { UserRoundPlus } from 'lucide-react';
import { useChatStore } from 'src/zustand/chatStore';

const ModalThisChatResult = ({ usersInChat }: { usersInChat: string[] }) => {
  const { userList } = useContentStore();
  const { userWillAddedAfter, setUserWillAddedAfter } = useChatStore();
  const myName = localStorage.getItem('nickname');

  const handleAddUser = (nickname: string) => {
    const updatedUserList = [...userWillAddedAfter, nickname];
    setUserWillAddedAfter(updatedUserList);
  }

  return (
    <div className="flex items-center w-full justify-center">
      <div className='w-full mt-7 border rounded-xl px-5 py-5 '>
        {userList.length !== 0 ? <Table>
          <TableBody>
            {userList.map((user, index) => (
              <TableRow key={index}>
                <TableCell className='w-[100px]'>
                  <img src={user.imageUrl} alt={`profile-img-${index}`} className='rounded-full w-12'></img>
                </TableCell>
                <TableCell>{user.nickname}</TableCell>
                <TableCell className="text-right w-[90px]">
                  {(user.nickname !== myName) && (![...usersInChat, ...userWillAddedAfter].includes(user.nickname)) &&<Button className='bg-point rounded-lg font-bold shadow-sm hover:bg-point-hover active:bg-point-active'onClick={() => handleAddUser(user.nickname)}><UserRoundPlus color="#ffffff" />사용자 추가하기</Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> : <div className='text-black flex justify-center py-5'>검색 결과가 없습니다.</div>}
      </div>
    </div>
  )
}

export default ModalThisChatResult
