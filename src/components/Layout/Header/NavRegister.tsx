import React from 'react'
import { useNavigate } from 'react-router'

const NavRegister = () => {
  const navi = useNavigate()

  return (
    <div onClick={() => navi("/register")} className='ml-3 cursor-pointer'>
      회원가입
    </div>
  )
}

export default NavRegister
