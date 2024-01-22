import React, { useContext } from 'react'
// import { useNavigate } from 'react-router'
import { SetModalContext } from "../Layout"

const NavRegister = () => {
  // const navi = useNavigate()
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
