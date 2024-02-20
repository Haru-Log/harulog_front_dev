import { Input } from 'src/ui/input';
import React, { useState } from 'react';
import { Button } from 'src/ui/button';
import { useContentStore } from 'src/zustand/searchUserStore';
import { searchUsers } from 'src/api/search/SearchUsers';
import { Search, XCircle } from 'lucide-react';
import ModalSearchResult from './ModalSearchResult';
import { useChatStore } from 'src/zustand/chatStore';
import ConfirmationModal from '../ConfirmationModal';
import { createNewChatRoom } from 'src/api/chats/CreateNewChatRoom';

interface CreateNewChatModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const CreateNewChatModal: React.FC<CreateNewChatModalProps> = ({ onCancel, onConfirm }) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };
  const { content, searchToggle, currentPage, userList, setContent, setUserList, setTotalPage, setCurrentPage } = useContentStore();
  const { userWillAdded, setUserWillAdded } = useChatStore();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSearchButton = async () => {
    setCurrentPage(0);
    try {
      const response = await searchUsers(searchToggle, content, currentPage);
      setUserList(response.data.contents);
      setTotalPage(response.data.pageInfo.totalPages)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleSearchButton();
    }
  }

  const handleRemoveUser = (nickname: string) => {
    const updatedUserList = userWillAdded.filter(user => user !== nickname);
    setUserWillAdded(updatedUserList);
    console.log(userWillAdded);
  }

  const handleChatCreate = async (userWillAdded: string[]) => {
    await createNewChatRoom(userWillAdded);
    window.location.reload();
  }


  const addedUserBadge = (
    <div className="flex mt-5">
      {userWillAdded.map((user, index) => (
        <div key={index} className="bg-point text-white px-3 py-2 rounded-2xl mr-2 flex flex-row items-center justify-between">{user}<XCircle color="#ffffff" className='ml-2 cursor-pointer' onClick={() => handleRemoveUser(user)} /></div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-300 opacity-75" onClick={handleBackdropClick}></div>
      <div className="w-auto h-auto z-50 bg-white p-8 rounded-3xl drop-shadow-xl">
        <span className='font-semibold'>새로운 채팅방 만들기</span>
        {addedUserBadge}
        <div className='flex flex-row items-center justify-between mt-5'>
          <Input
            type="text"
            className="w-5/6 px-3 py-2 h-12"
            placeholder="추가할 유저 검색"
            value={content}
            onChange={(e) => { setContent(e.target.value) }}
            onKeyDown={handleKeyPress}
          />
          <Button className="h-12 px-3 py-2 bg-point hover:bg-point-hover active:bg-point-active" onClick={handleSearchButton}>
            <Search color="#ffffff" />
          </Button>
        </div>
        <ModalSearchResult />

        <div className="mt-10 flex justify-between w-full">
          <Button className='bg-main font-semibold hover:bg-main-hover shadow-lg' onClick={onCancel}>취소</Button>
          <Button className='bg-point text-white font-semibold ml-4 hover:bg-point-hover shadow-lg' onClick={() => setShowConfirmation(true)}>생성</Button>
        </div>
      </div>
      {showConfirmation && (
        <ConfirmationModal
          message={`${userWillAdded} 과 채팅방을 만드시겠습니까?`}
          onConfirm={() => { handleChatCreate(userWillAdded); setShowConfirmation(false) }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default CreateNewChatModal;
