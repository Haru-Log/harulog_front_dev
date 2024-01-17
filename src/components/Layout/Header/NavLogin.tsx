import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { SetModalContext } from "../Layout";

const NavLogin = () => {
  const navi = useNavigate();
  const setLoginModal = useContext(SetModalContext);
  return (
    <div onClick={() => {navi("/login"); setLoginModal(true)}} className='cursor-pointer'>
      로그인
    </div>
  )
}

export default NavLogin
