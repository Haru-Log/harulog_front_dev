import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';
import NavItem from './NavItem';
import { NavItemList } from '../../../types/NavItem.type';

const TopNav: React.FC = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const navi = useNavigate();

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  const handleNavigation = (path: string) => {
    navi(path);
    setNavOpen(false);
  };

  return (
    <>
      <div onClick={toggleNav}>
        {isNavOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
      {isNavOpen && (
        <div className="fixed top-12 left-0 z-50 w-full h-auto bg-slate-100 border-b border-gray-300 p-3 drop-shadow-xl">
          {NavItemList.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer w-fit hover:underline"
              onClick={() => handleNavigation(item.path)}
            >
              <NavItem title={item.title} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TopNav;
