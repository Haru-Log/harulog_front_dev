import React, { useContext } from 'react'
import { SetModalContext } from './../../../App';

const NavLogin = () => {
  const setLoginModal = useContext(SetModalContext)?.setLoginModal;
  return (
    <div onClick={() => {
      setLoginModal(true)}} className='cursor-pointer text-sm'>
      로그인
    </div>
  )
}

export default NavLogin
