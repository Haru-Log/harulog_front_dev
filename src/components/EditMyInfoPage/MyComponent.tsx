import React from 'react';
import bookCover from 'src/assets/bookCover.jpg';

const MyComponent: React.FC = () => {
  return (
    <>
      <div className="w-16 h-16 overflow-hidden rounded-full style={{ marginTop: '-10px' }}">
        <img
          src={bookCover} // 이미지를 불러오기 위해 {bookCover} 사용
          alt="profile"
          className="w-full h-full object-cover  "
          
        />
      </div>
    </>
  );
};

export default MyComponent;
export {};
