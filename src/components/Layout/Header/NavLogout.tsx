import { getCookie } from "../../../hooks/useCookies";
import { sendLogoutRequest } from './../../../api/loginRegister/sendLogoutRequest';
import { useEffect } from "react";

const NavLogout = () => {

  useEffect(() => {
    console.log(getCookie('refreshToken'));
  }, [])

  const handleLogout = async () => {
    await sendLogoutRequest();
    window.location.replace('/')
  }

  return (
    <div
      onClick={handleLogout} className='cursor-pointer text-sm font-ibm mr-3'>
      로그아웃
    </div>
  )
}

export default NavLogout
