import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { changePassword } from './../../api/profile/ChangePassword';
import { Input } from '@/ui/input';

const PasswordChangeForm: React.FC = () => {
  const [currentPW, setCurrentPW] = useState('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showCurrentPW, setShowCurrentPW] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const isPasswordValid: boolean =
    password.length === 0 ||
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(
      password
    );
  const isConfirmPasswordValid: boolean = password === confirmPassword;
  const isButtonDisabled = !isPasswordValid || !isConfirmPasswordValid;

  const handleToggleCurrentPasswordVisibility = () => {
    setShowCurrentPW(!showCurrentPW);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChangePassword = async () => {
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(
        password
      )
    ) {
      alert('비밀번호는 10자 이상 대, 소문자 포함, 특수문자 포함해야 합니다.');
      return;
    }

    const response = await changePassword({
      beforePassword: currentPW,
      afterPassword: password,
    });
    if (response.message === 'OK') {
      alert('비밀번호 변경 완료');
      setPassword('');
      setCurrentPW('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="mx-auto p-4" style={{ margin: '-35px 0px' }}>
      {/* 현재 비밀번호 */}
      <label className="block  mb-2">현재 비밀번호</label>
      <div className="relative mb-4 mr-2">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="10자 이상 대, 소문자 포함, 특수문자 포함해야 합니다."
          value={currentPW}
          onChange={(e) => setCurrentPW(e.target.value)}
          className="w-full p-2 border border-point rounded-lg shadow-md focus:outline-none focus:inputborder-blue-700 text-xs"
        />
        <button
          onClick={handleToggleCurrentPasswordVisibility}
          className="absolute top-1/2 right-10 transform -translate-y-1/2 text-gray-200 focus:outline-none"
        >
          {showPassword ? <Eye /> : <EyeOff />}
        </button>
      </div>

      {/* 비밀번호 변경 */}
      <label className="block  mb-2">비밀번호 변경</label>
      <div className="relative mb-4 mr-2">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="10자 이상 대, 소문자 포함, 특수문자 포함해야 합니다."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-point rounded-lg shadow-md focus:outline-none focus:inputborder-blue-700 text-xs"
        />
        <button
          onClick={handleTogglePasswordVisibility}
          className="absolute top-1/2 right-10 transform -translate-y-1/2 text-gray-200 focus:outline-none"
        >
          {showPassword ? <Eye /> : <EyeOff />}
        </button>
        {!isPasswordValid && (
          <p className="text-red-500 text-xs mt-2 ml-2">
            10자 이상 대, 소문자, 특수문자를 포함해야 합니다.
          </p>
        )}
      </div>

      {/* 비밀번호 확인 */}
      <label className="block mb-2 ">비밀번호 확인</label>
      <div className="relative mb-4 mr-2">
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="앞에서 입력한 비밀번호를 다시 입력하세요."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border border-point rounded-lg shadow-md focus:outline-none focus:inputborder-blue-700 text-xs"
        />
        <button
          onClick={handleToggleConfirmPasswordVisibility}
          className="absolute top-1/2 right-10 transform -translate-y-1/2 text-gray-200 focus:outline-none"
        >
          {showConfirmPassword ? <Eye /> : <EyeOff />}
        </button>
      </div>
      {!isConfirmPasswordValid && (
        <p className="text-red-500 text-xs mt-2 ml-2">
          비밀번호가 일치하지 않습니다.
        </p>
      )}
      <div className="w-full flex justify-end pr-2">
        <button
          className=" text-sm text-white px-4 mt-6 mb-10 py-1 rounded  shadow-md bg-[#84B4BB]"
          disabled={isButtonDisabled || password.length === 0}
          onClick={handleChangePassword}
        >
          비밀번호 변경
        </button>
      </div>
    </div>
  );
};

export default PasswordChangeForm;
