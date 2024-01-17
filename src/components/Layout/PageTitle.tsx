import React from 'react';

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <div className='text-3xl font-black m-7'>
      {title}
    </div>
  );
};

export default PageTitle;
