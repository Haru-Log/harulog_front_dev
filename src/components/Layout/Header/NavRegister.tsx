import React, { useContext } from 'react'
import { SetModalContext } from './../../../App';

const NavRegister = () => {
  const setRegisterModal = useContext(SetModalContext)?.setRegisterModal;

  return (

    <div onClick={() => { 
      // navi("/register"); 
      setRegisterModal(true) }} className='ml-3 cursor-pointer'>
      회원가입
    </div>
  )
}

export default NavRegister
