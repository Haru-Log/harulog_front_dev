import React, { useState, useRef } from 'react';

const ProfileImageUpload: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // 이미지 업로드는 변경된 부분 없음
      uploadImage(file);
    }
  };

  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      // 서버로 이미지 업로드 요청 부분은 프로젝트에 맞게 수정 필요
      // const response = await fetch('서버 업로드 API 주소', {
      //   method: 'POST',
      //   body: formData,
      // });

      // 만약 서버에서 응답으로 이미지 URL을 받는다면, 해당 URL을 저장하거나 사용할 수 있습니다.
      // const responseData = await response.json();
      // const imageUrl = responseData.imageUrl;
      // 이후에 imageUrl을 사용하여 이미지를 표시하거나 저장할 수 있습니다.
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  const handleButtonClick = () => {
    // 버튼 클릭 시 파일 선택 다이얼로그 열기
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      {/* 파일 입력을 위한 input 엘리먼트 (숨겨져 있음) */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />

      {/* 고정된 프로필 이미지 표시 */}
      <div>
        <img
          src={image || 'https://i.pinimg.com/564x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg'} // 이미지가 있으면 업로드한 이미지, 없으면 기본 이미지 사용
          alt="Profile"
          className='w-60 h-60 min-w-60 rounded-full object-cover'

        />
      </div>

      {/* 프로필 이미지 변경 버튼 */}
      <button
        onClick={handleButtonClick}
        className="bg-gray-100 text-black px-4  rounded-full overflow-hidden  font-bold mt-2 mb-2 shadow-md text-xs "
      >
        프로필 이미지 변경
      </button>

      <p className="text-xs px-2">
        이강혁 <br />
        email@gmail.com <br />
        01/01/2024 가입
      </p>
    </div>
  );
};

export default ProfileImageUpload;
