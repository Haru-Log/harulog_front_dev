import React from 'react';

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <div className='text-4xl font-black m-7 pt-12'>
      {title}
    </div>
  );
};

export default PageTitle;