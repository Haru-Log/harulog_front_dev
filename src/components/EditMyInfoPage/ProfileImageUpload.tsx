import { EditProfileImg } from "../../api/profile/EditProfileImg";
import React, { useState, useRef, useEffect } from 'react';

const ProfileImageUpload: React.FC<{
  userName: string; email: string; createdAt: string; imageUrl: string
}> = ({ userName, email, createdAt, imageUrl }) => {

  const [image, setImage] = useState<string | null>(imageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    setImage(imageUrl)
  }, [imageUrl])

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      if (window.confirm('프로필 이미지 변경 하시겠습니까?')) {
        // 이미지 업로드는 변경된 부분 없음
        const formData = new FormData();

        formData.append('image', file)
        const response = await EditProfileImg(formData);

        if (response) {
          window.location.reload()
        }
      }
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
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} />

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
        {userName} <br />
        {email} <br />
        {createdAt} 가입
      </p>
    </div>
  );
};

export default ProfileImageUpload;
