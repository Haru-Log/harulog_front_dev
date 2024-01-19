import React, { createContext, useState } from 'react'
import Header from './Header/Header'
import { Outlet } from 'react-router'
import Footer from './Footer/Footer'

type SetModalState = {
  setLoginModal: any;
  setRegisterModal: any;
}

type ModalState = {
  loginModal: boolean;
  registerModal: boolean;
}

export const SetModalContext = createContext<SetModalState | null>(null);
export const ModalContext = createContext<ModalState | null>(null);

const Layout = () => {

  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  return (
    <div>
      <ModalContext.Provider value={{ loginModal, registerModal }}>
        <SetModalContext.Provider value={{ setLoginModal, setRegisterModal }}>
          <Header />
          <Outlet />
        </SetModalContext.Provider>
      </ModalContext.Provider>
      <Footer />
    </div>
  )
}

export default Layout
