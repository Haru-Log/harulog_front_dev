import React from 'react'
import TopNav from './TopNav'
import Title from './Title'
import NavLogin from './NavLogin'
import NavRegister from './NavRegister'

const Header = () => {
  return (
    <div className='flex w-full h-12 px-3 items-center justify-between border-b border-gray-400'>
      <TopNav />
      <Title />
      <div className='flex'>
        <NavLogin />
        <NavRegister />
      </div>
    </div>
  )
}

export default Header
