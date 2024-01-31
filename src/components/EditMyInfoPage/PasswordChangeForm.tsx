import { Input } from 'src/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

const PasswordChangeForm: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      validatePassword();
    }
  };

  const validatePassword = () => {
    // 비밀번호 유효성 검사 로직
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError('10자 이상 대, 소문자, 특수문자를 포함해야 합니다.');
    } else {
      setPasswordError('');
    }

    // 비밀번호 확인 일치 여부 확인
    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  };

  return (
    <div
      className="mx-auto p-4"
      style={{ margin: '-35px 0px' }}
    >
      {/* 비밀번호 변경 */}
      <label className="block  mb-2">비밀번호 변경</label>
      <div className="relative mb-4 mr-2">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="10자 이상 대, 소문자 포함, 특수문자 포함해야 합니다."
          value={password}
          onChange={handlePasswordChange}
          onKeyPress={handleKeyPress}
          className="w-full p-2 border border-point rounded-lg shadow-md focus:outline-none focus:inputborder-blue-700 text-xs"
        />
        <button
          onClick={handleTogglePasswordVisibility}
          className="absolute top-1/2 right-10 transform -translate-y-1/2 text-gray-200 focus:outline-none"
        >
          {showPassword ? <Eye /> : <EyeOff />}

        </button>
      </div>
      {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}

      {/* 비밀번호 확인 */}
      <label className="block mb-2 ">비밀번호 확인</label>
      <div className="relative mb-4 mr-2">
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="앞에서 입력한 비밀번호를 다시 입력하세요."
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onKeyPress={handleKeyPress}
          className="w-full p-2 border border-point rounded-lg shadow-md focus:outline-none focus:inputborder-blue-700 text-xs"
        />
        <button
          onClick={handleToggleConfirmPasswordVisibility}
          className="absolute top-1/2 right-10 transform -translate-y-1/2 text-gray-200 focus:outline-none"
        >
          {showConfirmPassword ? <Eye /> : <EyeOff />}

        </button>
      </div>
      {confirmPasswordError && (
        <p className="text-red-500 text-xs">{confirmPasswordError}</p>
      )}
    </div>
  );
};

export default PasswordChangeForm;
