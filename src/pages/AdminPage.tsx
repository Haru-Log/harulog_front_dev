import { Archive, Trash2, User } from 'lucide-react'
import React, { useEffect } from 'react'
import { useAdminStore } from '../zustand/adminStore'
import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { fetchAll } from '../api/admin/FetchAll';
import { deleteFeedOrUsers } from '../api/admin/DeleteFeedOrUser';
import AdminPagination from '../components/AdminPage/AdminPagination';

const AdminPage = () => {
  const { toggle, userList, feedList, currentFeedPage, currentUserPage,  setToggle, setUserList, setFeedList, setCurrentFeedPage, setTotalFeedPage, setCurrentUserPage, setTotalUserPage } = useAdminStore();
  const deleteType = toggle === 'users' ? 'user' : 'post';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (toggle === 'users') {
          const response = await fetchAll(toggle, currentUserPage);
          setUserList(response.data.content);
          setTotalUserPage(response.data.pageInfo.totalPages)
        } else {
          const response = await fetchAll(toggle, currentFeedPage);
          setFeedList(response.data.content);
          setTotalFeedPage(response.data.pageInfo.totalPages)
        }
        
      } catch (error) {
        console.error('Error fetching all for admin:', error);
      }
    };
    fetchUsers();
  }, [setUserList, setFeedList, setCurrentFeedPage, setTotalFeedPage, setCurrentUserPage, setTotalUserPage, toggle, currentUserPage, currentFeedPage])

  const handleUserDelete = async (id: number) => {
    try {
      const response = await deleteFeedOrUsers(deleteType, id);
      if (response.status === 200) {
        alert('삭제되었습니다.');
      }
      window.location.reload();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  return (
    <div className="w-full flex justify-center mt-10 font-ibm">
      <div className="w-full h-full flex flex-col mx-10 items-center">
        <div className="w-full flex justify-between">
          <div
            className={`w-full h-fit flex justify-center p-2 cursor-pointer items-center ${toggle === 'posts' ? 'border-t-4 border-black font-bold' : 'border-t border-t-gray-400 text-gray-400'}`}
            onClick={() => setToggle('posts')}
          >
            <Archive className="mr-2" strokeWidth={2.5} size={32} />피드
          </div>
          <div
            className={`w-full h-fit flex justify-center p-2 cursor-pointer items-center  ${toggle === 'users' ? 'border-t-4 border-black font-bold' : 'border-t border-t-gray-400 text-gray-400'}`}
            onClick={() => setToggle('users')}
          >
            <User className="mr-2" strokeWidth={2.5} size={32} />사용자
          </div>
        </div>
        <Table>
          <TableBody>
            {toggle === 'users' ? userList.map((user, index) => (
              <TableRow key={index}>
                <TableCell className='w-[100px]'>
                  <img src={user.imageUrl} alt={`profile-img-${index}`} className='rounded-full w-12'></img>
                </TableCell>
                <TableCell>{user.nickname}</TableCell>
                <TableCell className="text-right w-[90px]">
                  <Button className='bg-point rounded-lg font-bold shadow-sm hover:bg-point-hover active:bg-point-active' onClick={() => handleUserDelete(user.id!)}>
                    <Trash2 color="#ffffff" className='mr-2 h-5 w-5' />삭제
                  </Button>
                </TableCell>
              </TableRow>
            )) :
            feedList.map((feed, index) => (
              <TableRow key={index}>
                <TableCell className='w-[100px]'>
                  {feed.categoryName}
                </TableCell>
                <TableCell>{feed.nickname}</TableCell>
                <TableCell>{feed.content}</TableCell>
                <TableCell className="text-right w-[90px]">
                <Button className='bg-point rounded-lg font-bold shadow-sm hover:bg-point-hover active:bg-point-active' >
                    <Trash2 color="#ffffff" className='mr-2 h-5 w-5' />삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AdminPagination />
      </div>
    </div>
  )
}

export default AdminPage
