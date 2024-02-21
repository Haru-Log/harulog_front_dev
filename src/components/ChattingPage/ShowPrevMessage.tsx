import { useChatStore } from 'src/zustand/chatStore';
import React, { useState } from 'react'
import { loadPrevMsg } from 'src/api/chats/LoadPrevMsg';
import { Button } from 'src/ui/button';

const ShowPrevMessage = () => {
  const [noMoreMsg, setNoMoreMsg] = useState(false);
  const { selectedChatroomInfo, selectChatroomInfo } = useChatStore();

  const handleLoadPrevMsg = async () => {
    const response = await loadPrevMsg(selectedChatroomInfo.roomId, selectedChatroomInfo.messages[0].messageId);
    if (response.code === 'CHT-301')
      setNoMoreMsg(true);
    else {
      const updatedMessages = [...response.messages, ...selectedChatroomInfo.messages];
      selectChatroomInfo({ ...selectedChatroomInfo, messages: updatedMessages });
    }
  }
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setNoMoreMsg(false);
    }
  };
  return (
    <div className='flex items-start z-50'>
      <div className='w-full flex items-center justify-center underline cursor-pointer mt-2' onClick={handleLoadPrevMsg}>
        이전 메세지 보기
      </div>
      {noMoreMsg &&
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-300 opacity-75"
            onClick={handleBackdropClick}>
            <div className="w-auto h-auto z-50 bg-white p-8 rounded-3xl drop-shadow-xl">
              <span className='font-semibold'>이전 메세지가 없습니다.</span>
              <Button className="bg-main text-white font-semibold hover:bg-main-hover shadow-lg " onClick={() => setNoMoreMsg(false)}>
                닫기
              </Button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default ShowPrevMessage
