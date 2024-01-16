import React from 'react';

interface NavItemProps {
  title: string;
}

const NavItem: React.FC<NavItemProps> = ({ title }) => {
  return <div className="text-6xl font-black pb-2">{title}</div>;
};

export default NavItem;