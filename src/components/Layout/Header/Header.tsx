import React, { useEffect, useState } from 'react';
import TopNav from './TopNav';
import Title from './Title';
import NavLogin from './NavLogin';
import NavRegister from './NavRegister';
const Header = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    let prevScrollPos = document.documentElement.scrollTop;

    const handleScroll = () => {
      const currentScrollPos = document.documentElement.scrollTop;
      setIsHeaderVisible(currentScrollPos <= 0 || prevScrollPos > currentScrollPos);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`flex w-full h-12 px-3 items-center justify-between bg-white border-b border-gray-400 z-50 transition-transform duration-900 ease-in-out ${isHeaderVisible ? 'fixed top-0 transform translateY(0)' : 'transform -translate-y-full'}`}>
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
