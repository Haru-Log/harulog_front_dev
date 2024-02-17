import { Archive, User } from 'lucide-react'
import React from 'react'
import { useAdminStore } from '../zustand/adminStore'

const AdminPage = () => {
  const { toggle, userList, feedList, currentFeedPage, totalFeedPage, currentUserPage, totalUserPage, setToggle, setUserList, setFeedList, setCurrentFeedPage, setTotalFeedPage, setCurrentUserPage, setTotalUserPage } = useAdminStore();
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
      </div>
    </div>
  )
}

export default AdminPage
