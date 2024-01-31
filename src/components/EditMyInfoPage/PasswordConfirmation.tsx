import React, { useState } from 'react';

const PasswordConfirmation: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      validatePassword();
    }
  };

  const validatePassword = () => {
    if (password.length < 10 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError('10자 이상 대, 소문자 포함, 특수문자 포함해야 합니다.');
    } else {
      setError('');
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <label htmlFor="password" className="text-lg font-bold">
        비밀번호 확인
      </label>
      <div className="relative">
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={handlePasswordChange}
          onKeyPress={handleKeyPress}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
        />
        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={handleTogglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <span className="text-blue-500">숨기기</span>
          ) : (
            <span className="text-blue-500">보이기</span>
          )}
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-xs mt-2">
          {error}
        </div>
      )}
    </div>
  );
};

export default PasswordConfirmation;
