import React from 'react';
import { Button } from 'src/ui/button';

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onConfirm, onCancel }) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-300 opacity-75" onClick={handleBackdropClick}></div>
      <div className="z-50 bg-white p-8 rounded-xl drop-shadow-xl">
        <span className='font-semibold'>{message}</span>
        <div className="mt-10 flex justify-between w-full">
          <Button className='bg-main font-semibold hover:bg-main-hover shadow-lg' onClick={onCancel}>취소</Button>
          <Button className='bg-point text-white font-semibold ml-4 hover:bg-point-hover shadow-lg' onClick={onConfirm}>확인</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
