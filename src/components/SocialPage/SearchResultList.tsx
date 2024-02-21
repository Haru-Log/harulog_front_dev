import { Table, TableBody, TableCell, TableRow } from 'src/ui/table'
import { UserRoundX, UserSearch, XCircle } from 'lucide-react'
import { Button } from 'src/ui/button'
import { useContentStore } from 'src/zustand/searchUserStore'
import { useNavigate } from 'react-router-dom'
import { cancelFollow } from 'src/api/follow/CancelFollow'
import { deleteFollower } from 'src/api/follow/DeleteFollow'
import { UserList } from 'src/types/userList.type'
import SocialProfileImg from "./SocialProfileImg"

const SearchResultList = () => {
  const myName = localStorage.getItem('nickname');
  console.log('myName:', myName);
  const { userList, searchToggle } = useContentStore();

  const navi = useNavigate();
  console.log('userList:', userList);

  const handleBtn = async (nickname: string) => {
    navi(`/profile/${nickname}`)
  }

  const handleUnfollow = async (nickname: string) => {
    await cancelFollow(nickname);
    alert(`${nickname}님에 대한 팔로우가 취소되었습니다.`);
    window.location.reload();
  }

  const handleDelete = async (nickname: string) => {
    await deleteFollower(nickname);
    alert(`팔로워 ${nickname}님을 삭제했습니다.`);
    window.location.reload();
  }

  const renderButton = (user: UserList) => {
    switch (searchToggle) {
      case 'all':
        return (
          <Button className='bg-point rounded-lg font-bold shadow-sm hover:bg-point-hover active:bg-point-active'
            onClick={() => handleBtn(user.nickname)}>
            <UserSearch color="#ffffff" className='mr-2 h-5 w-5' />프로필 보러가기
          </Button>
        );
      case 'followings':
        return (
          <Button className='bg-point rounded-lg font-bold shadow-sm hover:bg-point-hover active:bg-point-active'
            onClick={() => handleUnfollow(user.nickname)}>
            <XCircle color="#ffffff" className='mr-2 h-5 w-5' />팔로잉 취소하기
          </Button>
        );
      case 'followers':
        return (
          <Button className='bg-point rounded-lg font-bold shadow-sm hover:bg-point-hover active:bg-point-active'
            onClick={() => handleDelete(user.nickname)}>
            <UserRoundX color="#ffffff" className='mr-2 h-5 w-5' />팔로워 삭제하기
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center w-full justify-center">
      <div className='w-full mt-7 border rounded-xl px-5 py-5 '>
        {userList.length !== 0 ? <Table>
          <TableBody>
            {userList.map((user, index) => (
              <TableRow key={index}>
                <TableCell className='w-[100px]'>
                  <SocialProfileImg key={user.imageUrl} imageUrl={user.imageUrl} index={index} />
                </TableCell>
                <TableCell>{user.nickname}</TableCell>
                <TableCell className="text-right w-[90px]">
                  {(user.nickname !== myName) && renderButton(user)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> : <div className='text-black flex justify-center py-5'>검색 결과가 없습니다.</div>}
      </div>
    </div>
  )
}

export default SearchResultList
