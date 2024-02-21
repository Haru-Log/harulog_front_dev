import { MessageCirclePlus } from "lucide-react"
import { useState } from "react";
import CreateNewChatModal from "./CreateNewChatModal";
import { useChatStore } from "src/zustand/chatStore";
import { ChatRoom } from "src/types/ChatRoom.type";

const MessageListHeader = () => {
  const { selectChatroomInfo } = useChatStore();
  const [showModal, setShowModal] = useState(false);

  const handleAddMessage = () => {
    const initialChatroomInfo: ChatRoom = {
      roomId: '',
      userCount: 0,
      messages: [],
    };
    selectChatroomInfo(initialChatroomInfo);
    setShowModal(true);
  }
  
  return (
    <div className="sticky top-0 z-10 text-lg font-bold leading-none bg-[#B8D8DD] pt-4 pb-4 px-4 flex justify-between items-start">
    <span>메세지</span>
    <MessageCirclePlus className="cursor-pointer" onClick={handleAddMessage} />
    {showModal && (
        <CreateNewChatModal
          onConfirm={() => {}}
          onCancel={() => setShowModal(false)}
        />)
      }
  </div>
  )
}

export default MessageListHeader
