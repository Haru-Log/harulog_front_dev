import React from 'react';

const ProfileNumber: React.FC<{ title: string; count: number }> = ({
  count,
  title,
}) => {
  return (
    <div className="flex items-center flex-col">
      <div className="text-3xl font-bold mb-5">{count}</div>
      <div className="font-bold">{title}</div>
    </div>
  );
};

export default ProfileNumber;
