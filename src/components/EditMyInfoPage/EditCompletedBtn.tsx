import React, { useState } from 'react';

const EditCompleteButton: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);

  const handleEditComplete = () => {
    // 여기에서 수정 완료와 관련된 로직 수행

    // 수정 완료 후 메시지 표시
    setShowMessage(true);

    // 일정 시간이 지난 후 메시지 감춤
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  return (
    <div className="text-center">
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700"
        onClick={handleEditComplete}
      >
        수정 완료
      </button>

      {showMessage && (
        <p className="text-green-500 text-xs mt-2">수정이 완료되었습니다</p>
      )}
    </div>
  );
};

export default EditCompleteButton;
