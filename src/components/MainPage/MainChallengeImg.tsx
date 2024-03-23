import React, { useEffect, useState } from 'react';
import { fetchImgFromFirebase } from '../../api/fetchImgFirebase';

const MainChallengeImg: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const [challengeImg, setChallengeImg] = useState('');
  useEffect(() => {
    const loadImage = async () => {
      const res = await fetchImgFromFirebase(imageUrl);
      setChallengeImg(res);
    };
    loadImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <img
      src={challengeImg}
      alt="챌린지 이미지"
      className="object-cover w-full h-full rounded-xl"
    />
  );
};

export default MainChallengeImg;
