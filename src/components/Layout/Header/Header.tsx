import React, { useEffect, useState } from 'react';
import TopNav from './TopNav';
import Title from './Title';
import NavLogin from './NavLogin';
import NavRegister from './NavRegister';

const Header = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsHeaderVisible(currentScrollPos <= 0 || prevScrollPos > currentScrollPos);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`flex w-full h-12 px-3 items-center justify-between bg-white border-b border-gray-400 z-50 ${isHeaderVisible ? 'fixed top-0' : ''}`}>
      <TopNav />
      <Title />
      <div className='flex'>
        <NavLogin />
        <NavRegister />
      </div>
    </div>
  );
};

export default Header;
