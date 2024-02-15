import React, { useState } from 'react';
import ModalToggle from './ModalToggle';
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../api/profile/DeleteAccount";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
  };

  const handleDeleteAccount = async () => {
    if(window.confirm('정말로 삭제하시겠습니까?'))
    {
      const response = await deleteAccount(email);
      if (response) {
        setIsOpen(false);
        localStorage.removeItem('AccessToken')
        navigate('/', { replace: true })
      }
    }
  };

  return (
    <div className="w-full">
      <hr className="border-b border-gray-300 my-2 mr-6" />
      <span className="mr-2 font-bold mb-2 text-sm ">계정 제거</span>
      <div className="flex flex-row justify-between items-center">
        <p className="text-xs mt-3">계정을 삭제하시면 복구는 불가능합니다.</p>
        <button onClick={openModal} className=" bg-red-500 text-sm  text-white px-4 py-1 rounded shadow-md mr-6">
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
            <div className="p-4">
              계정삭제하기
              <p className="mb-1 mt-2 text-xs">
                정말로 계정을 삭제하시겠습니까? 계정을 삭제하시면 복구는
                불가능합니다.
              </p>
              <h6 className="mt-6 mb-2 text-sm">
                이메일
              </h6>
              <ModalToggle email={email} setEmail={setEmail} />
              <button
                onClick={() => setIsOpen(false)}
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
