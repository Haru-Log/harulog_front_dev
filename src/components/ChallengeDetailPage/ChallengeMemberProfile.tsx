import React, { useEffect, useState } from 'react';
import { fetchImgFromFirebase } from './../../api/fetchImgFirebase';

const ChallengeMemberProfile: React.FC<{ imgUrl: string; index: number }> = ({
  imgUrl,
  index,
}) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const loadProfileImage = async () => {
      const url = await fetchImgFromFirebase(imgUrl);
      setUrl(url);
    };
    loadProfileImage();
  }, [imgUrl]);
  return (
    <img src={url} alt={`profile-img-${index}`} className="rounded-full w-12" />
  );
};

export default ChallengeMemberProfile;
