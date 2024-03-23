import { sendLogoutRequest } from './../../../api/loginRegister/sendLogoutRequest';

const NavLogout = () => {
  const handleLogout = async () => {
    await sendLogoutRequest();
    window.location.replace('/');
  };

  return (
    <div
      onClick={handleLogout}
      className="cursor-pointer text-sm font-ibm mr-3"
    >
      로그아웃
    </div>
  );
};

export default NavLogout;
