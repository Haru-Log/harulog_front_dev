import React, { useState } from 'react';
import { Button } from 'src/ui/button';
import { Search } from 'lucide-react';
import { Input } from 'src/ui/input';
import { useContentStore } from 'src/zustand/searchUserStore';
import { searchUsers } from 'src/api/search/SearchUsers';
import ModalThisChatResult from './ModalThisChatResult';
import { useChatStore } from 'src/zustand/chatStore';
import { addUsersExistChatRoom } from 'src/api/chats/AddUsersExistChatRoom';
import ConfirmationModal from '../ConfirmationModal';

interface ThisChatUserModalProps {
  usersInChat: string[];
  onClose: () => void;
}

const ThisChatUserModal: React.FC<ThisChatUserModalProps> = ({ usersInChat, onClose }) => {
  const { content, searchToggle, currentPage, setContent, setUserList, setTotalPage, setCurrentPage } = useContentStore();
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
  const { userWillAddedAfter, selectedChatroomInfo } = useChatStore();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddUsers = async() => {
    await addUsersExistChatRoom(userWillAddedAfter, selectedChatroomInfo.roomId)
    window.location.reload();
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-300 opacity-75" onClick={handleBackdropClick}></div>
      <div className="w-auto h-auto z-50 bg-white p-8 rounded-3xl drop-shadow-xl">
        <span className='font-semibold'>이 채팅방에 참여중인 사용자</span>
        <div className="flex flex-row mt-5">
        {[...usersInChat, ...userWillAddedAfter].map((user, index) => (
        <div key={index} className="bg-point text-white px-3 py-2 rounded-2xl mr-2 flex flex-row items-center justify-between">@{user}</div>
      ))}
        </div>
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
        <ModalThisChatResult usersInChat={usersInChat} />
        <div className="mt-6 flex justify-between">
          <Button className="bg-main text-white font-semibold hover:bg-main-hover shadow-lg " onClick={()=>setShowConfirmation(false)}>
            닫기
          </Button>
          <Button className="bg-point text-white font-semibold hover:bg-point-hover shadow-lg" onClick={()=>setShowConfirmation(true)}>
            사용자 추가
          </Button>
        </div>
      </div>
      {showConfirmation && (
        <ConfirmationModal
          message={`현재 채팅창에 ${userWillAddedAfter}님을 추가하시겠습니까?`}
          onConfirm={() => { handleAddUsers(); setShowConfirmation(false) }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default ThisChatUserModal;
