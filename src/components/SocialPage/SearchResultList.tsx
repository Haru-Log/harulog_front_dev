import { Table, TableBody, TableCell, TableRow } from 'src/ui/table'
import { UserSearch } from 'lucide-react'
import React from 'react'
import { Button } from 'src/ui/button'
import { useContentStore } from 'src/zustand/searchUserStore'
import { useNavigate } from 'react-router-dom'

const SearchResultList = () => {
  const myName = localStorage.getItem('nickname');
  const { userList } = useContentStore();
  const navi = useNavigate();
  console.log('userList:', userList);
  const handleBtn = (nickname: string) => {
    navi(`/profile/${nickname}`)
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
                  {(user.nickname !== myName) && <Button className='bg-point rounded-lg font-bold shadow-sm hover:bg-point-hover active:bg-point-active'
                  onClick={() => handleBtn(user.nickname)}>
                    <UserSearch color="#ffffff" className='mr-2 h-5 w-5'/>프로필 보러가기
                  </Button>}
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
