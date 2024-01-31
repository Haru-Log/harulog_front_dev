import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModalToggle: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="modal">
      <div className="modal-content flex items-center">
        <input
          type={passwordVisible ? 'text' : 'password'}
          placeholder="계정을 삭제하려면 비밀번호를 입력하세요."
          id="passwordInput"
          className="w-full text-xs p-2 border border-gray-100 rounded-md mr-2"
          style={{ outline: '1px solid #84B4BB' }}
        />
        <span className="cursor-pointer" onClick={togglePasswordVisibility}>
          {/* <FontAwesomeIcon
            icon={passwordVisible ? faEye : faEyeSlash}
            style={{ position: 'relative', right: '55px', color: 'grey' }}
          /> */}
          {passwordVisible ? <Eye className='relative right-14 text-gray-400' /> : <EyeOff className='relative right-14 text-gray-400' />}
        </span>
      </div>
    </div>
  );
};

export default ModalToggle;
