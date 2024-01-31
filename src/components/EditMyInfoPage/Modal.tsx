import React, { useState } from 'react';
import ModalToggle from './ModalToggle';
import PasswordChangeForm from './PasswordChangeForm';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDeleteAccount = () => {
    // 여기에 계정 삭제 로직을 추가하세요.
    console.log('계정 삭제');
    // 실제로는 API 호출이나 다른 로직을 수행해야 합니다.
    closeModal(); // 계정 삭제 후 모달을 닫습니다.
  };

  return (
    <div>
      <div>
        <button
          style={{
            backgroundColor: '#84B4BB',
            position: 'relative',
            left: '240px',
          }}
          className=" text-sm text-white px-4 mt-6 mb-10 py-1 rounded  shadow-md "
        >
          {/* style={{   backgroundColor: '#84B4BB'  }} */}
          수정완료
        </button>

        <p>
          <hr className="border-b border-gray-300 w-full my-2 mr-10 " />
        </p>

        <div className="flex flex-col items-start">
          {' '}
          {/* 추가된 부분 */}
          <span className="mr-2 font-bold mb-2 text-sm ">계정 제거</span>
          <p className="text-xs">계정을 삭제하시면 복구는 불가능합니다.</p>
        </div>

        <button
          onClick={openModal}
          className=" bg-red-500 text-sm  text-white px-4 py-1 rounded shadow-md"
          style={{ position: 'relative', left: '245px' }}
        >
          계정삭제
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-black opacity-75 fixed inset-0"></div>
          <div
            className="modal-container p-4 bg-white rounded-md z-10"
            style={{ border: '3px solid #84B4BB' }}
          >
            <div className="text-right">
              <button onClick={closeModal} className="text-gray-500"></button>
            </div>
            <div className="p-4">
              계정삭제하기
              <p className="mb-1 mt-2 text-xs">
                정말로 계정을 삭제하시겠습니까? 계정을 삭제하시면 복구는
                불가능합니다.
              </p>
              <h6 className="mt-2 mb-2 text-sm">비밀번호</h6>
              <ModalToggle />
              <button
                onClick={handleDeleteAccount}
                className="text-black-500 text-xs mt-4 px-20 py-2 rounded"
              >
                취소
              </button>
              <button
                onClick={handleDeleteAccount}
                className="text-red-500 px-4 mt-4 text-xs py-2 rounded"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
