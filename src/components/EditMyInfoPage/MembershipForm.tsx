// UpdateProfile.tsx

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const UpdateProfile: React.FC = () => {
  // 상태 변수 정의
  const [nickname, setNickname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>(''); // 이 부분을 추가
  const [confirmPasswordError, seconfirmPasswordError] = useState<string>(''); // 이 부분을 추가
  const [message, setMessage] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  // 비밀번호 가시성 토글 상태
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // 비밀번호 가시성 토글 핸들러
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // 비밀번호 확인 가시성 토글 핸들러
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // 비밀번호 유효성 검사 함수
  const isPasswordValid = (password: string) => {
    // 비밀번호 규칙: 10자 이상, 대문자, 소문자, 특수문자 포함
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{10,}$/;
    return passwordRegex.test(password);
  };

  // 폼 제출 핸들러
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // 전화번호 유효성 검사
    const phoneRegex = /^(010|070|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError('올바른 전화번호 형식이 아닙니다.');
      setMessage(''); // 전화번호 오류 발생 시 다른 메시지 초기화
      return;
    } else {
      setPhoneError(''); // 유효성 검사 통과 시 에러 메시지 초기화
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다. 다시 시도해주세요.');
      return;
    } else {
      setMessage(''); // 비밀번호 일치 시 다른 메시지 초기화
    }

    // 비밀번호 유효성 검사
    if (!isPasswordValid(password)) {
      setMessage(
        '비밀번호는 10자 이상이어야 하며 대문자, 소문자, 특수문자를 모두 포함해야 합니다.'
      );
      return;
    } else {
      setMessage(''); // 비밀번호 유효성 검사 통과 시 다른 메시지 초기화
    }

    // 여기에서 API 호출 또는 상태 업데이트 등의 로직을 추가합니다.
    // ...

    setMessage('회원 정보가 성공적으로 업데이트되었습니다.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="nickname"
          >
            닉네임:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            전화번호:
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              phoneError ? 'border-red-500' : ''
            }`}
            id="phone"
            type="tel"
            pattern="^(010|070|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {phoneError && (
            <div className="text-red-500 text-sm italic">{phoneError}</div>
          )}
        </div>

        <div className="mb-4 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="bio"
          >
            자기소개:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bio"
            rows={4}
            cols={50}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            비밀번호 변경:
          </label>
          <div>
            {/* className="flex items-center"> */}
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                passwordError ? 'text-red-500' : '' // 이 부분을 통해 오류가 있을 때 테두리를 붉은 색으로 설정합니다.
              }`}
              id="password"
              type={showPassword ? 'text' : 'password'} // 비밀번호 가시성에 따라 변경
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* FontAwesome 아이콘을 사용한 토글 버튼 */}
            <button
              className="ml-2 text-sm text-blue-500 focus:outline-none"
              type="button"
              style={{ position: 'relative', left: '330px', bottom: '30px' }}
              onClick={handleTogglePassword}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
        </div>

        <div className="mb-6 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            비밀번호 확인:
          </label>
          <div>
            {/* className="flex items-right"> */}
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                confirmPasswordError ? 'text-red-500' : '' // 이 부분을 통해 오류가 있을 때 테두리를 붉은 색으로 설정합니다.
              }`}
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'} // 비밀번호 확인 가시성에 따라 변경
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {/* FontAwesome 아이콘을 사용한 토글 버튼 */}
            <button
              className="ml-2  text-sm text-blue-500 focus:outline-none"
              type="button"
              onClick={handleToggleConfirmPassword}
              style={{ position: 'relative', left: '330px', bottom: '30px' }}
            >
              {showConfirmPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            수정 완료
          </button>
        </div>
        {message && (
          <div className="mb-4 text-green-500 text-sm italic">{message}</div>
        )}

        {phoneError && (
          <div className="mb-4 text-red-500 text-sm italic">{phoneError}</div>
        )}
      </form>
    </div>
  );
};

export default UpdateProfile;
