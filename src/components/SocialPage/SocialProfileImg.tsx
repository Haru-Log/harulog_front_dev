import React, { useEffect, useState } from 'react';
import { fetchImgFromFirebase } from './../../api/fetchImgFirebase';

const SocialProfileImg: React.FC<{ imageUrl: string; index: number }> = ({
  imageUrl,
  index,
}) => {
  const [profileImg, setProfileImg] = useState('');
  useEffect(() => {
    fetchImgFromFirebase(imageUrl).then((res) => setProfileImg(res));
  }, [imageUrl]);

  return (
    <img
      src={profileImg}
      alt={`profile-img-${index}`}
      className="rounded-full w-12"
    ></img>
  );
};

export default SocialProfileImg;
