import { LogOut, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import ConfirmationModal from '../ConfirmationModal';
import ThisChatUserModal from './ThisChatUserModal';
import { exitChatRoom } from '@/api/chats/ExitChatRoom';
import { getChatRoomName } from '@/utils/getChatRoomName';
import useGetUsersInThisChatBySelectedRoomId from '@/utils/useGetUsersInThisChatBySelectedRoomId';
import { useChatStore } from '@/zustand/chatStore';

const ChatroomHeader = () => {
  const { chatList, selectedChatroomInfo } = useChatStore();
  const [chatRoomName, setChatRoomName] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [userInChat, setUserInChat] = useState<string[]>([]);

  const users = useGetUsersInThisChatBySelectedRoomId();

  useEffect(() => {
    const name = getChatRoomName(chatList, selectedChatroomInfo.roomId);
    setChatRoomName(name);
    setUserInChat(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChatroomInfo.roomId, chatList]);

  const handleExitChat = async () => {
    await exitChatRoom(selectedChatroomInfo.roomId);
    window.location.reload();
  };

  return (
    <div className="text-lg leading-none bg-[#EAF0F7] pt-4 pb-2 px-4 flex justify-between items-start sticky top-0 z-10">
      <div className="flex items-start">
        <span className="mr-3">{chatRoomName}</span>
        <div
          className="cursor-pointer flex items-center justify-center mr-3"
          onClick={() => setShowUserModal(true)}
        >
          <Users size={16} />
          <span className="text-xs font-thin">
            {selectedChatroomInfo.userCount}
          </span>
        </div>
      </div>
      <div className="flex">
        <div
          className="cursor-pointer flex flex-col items-center justify-center mr-3"
          onClick={() => setShowConfirmation(true)}
        >
          <LogOut size={15} />
          <span className="text-xs font-thin">나가기</span>
        </div>
      </div>
      {showConfirmation && (
        <ConfirmationModal
          message={'정말 채팅방에서 퇴장하시겠습니까?'}
          onConfirm={() => {
            handleExitChat();
            setShowConfirmation(false);
          }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
      {showUserModal && (
        <ThisChatUserModal
          usersInChat={userInChat}
          onClose={() => setShowUserModal(false)}
        />
      )}
    </div>
  );
};

export default ChatroomHeader;
