import React from 'react'
import { useNavigate } from 'react-router'

const NavLogin = () => {
  const navi = useNavigate()
  return (
    <div onClick={() => navi("/login")} className='mx-3 cursor-pointer'>
      로그인
    </div>
  )
}

export default NavLogin
