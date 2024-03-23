import React from 'react';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModalToggle: React.FC<{
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}> = ({ email, setEmail }) => {
  return (
    <div className="modal">
      <div className="modal-content flex items-center">
        <input
          type="text"
          placeholder="계정을 삭제하려면 이메일을 입력하세요."
          id="passwordInput"
          className="w-full text-xs p-2 border border-gray-100 rounded-md mr-2"
          style={{ outline: '1px solid #84B4BB' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ModalToggle;
