import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router';
import NavItem from './NavItem';

interface NavListProps {
  title: string;
  path: string;
}

const navItems: NavListProps[] = [
  { title: "CHALLENGE", path: "/challenge" },
  { title: "FEED", path: "/feed" },
  { title: "DASHBOARD", path: "/dashboard" },
  { title: "SOCIAL", path: "/social" },
  { title: "GROW", path: "/grow" },
];

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
        <MenuIcon />
      </div>
      {isNavOpen && (
        <div className="fixed top-12 left-0 z-50 w-full h-auto bg-slate-100 border-b border-gray-400 flex flex-col p-3">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer"
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
