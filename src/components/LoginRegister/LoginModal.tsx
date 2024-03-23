import { useContext, useRef, useState } from 'react';
import KakaoIcon from '../../assets/kakao_icon.png';
import { SetModalContext } from '../../App';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { sendLoginRequest } from './../../api/loginRegister/sendLoginRequest';

const LoginModal = () => {
  const setLoginModal = useContext(SetModalContext)?.setLoginModal;
  const setRegisterModal = useContext(SetModalContext)?.setRegisterModal;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const ref: any = useRef();
  useOnClickOutside(ref, () => {
    console.log('setmodalcon', setLoginModal);
    setLoginModal(false);
  });

  const handleLogin = async () => {
    const userInfo = {
      email: email,
      password: password,
    };
    const response = await sendLoginRequest(userInfo);
    if (response.code === 'COM-000') {
      setLoginModal(false);
      window.location.reload();
    } else {
      setEmail('');
      setPassword('');
    }
  };

  const isEmailValid: boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="z-50 absolute font-ibm">
      <div className="fixed inset-3 flex justify-center">
        <div
          className="w-[50%] max-w-[800px] relative shadow-2xl h-fit flex rounded-xl overflow-hidden bg-[#ececec]"
          ref={ref}
        >
          <div className="w-full flex flex-col items-center p-10">
            <div className="text-6xl mb-5 whitespace-nowrap h-fit font-orbit">
              HaruLog
            </div>
            <div className="text-3xl whitespace-nowrap">로그인</div>
            <div className="flex flex-row mt-5 whitespace-nowrap">
              <div>아직 회원이 아니신가요? </div>
              <div
                className="text-[#92C7CF] ml-3 cursor-pointer mb-5 hover:underline"
                onClick={() => {
                  setRegisterModal(true);
                  setLoginModal(false);
                }}
              >
                회원가입
              </div>
            </div>
            <div className="w-full mb-10">
              <div className="w-full mb-5">
                <div className="mb-3 whitespace-nowrap">이메일</div>
                <input
                  type="email"
                  className="border-2 border-[#92C7CF] rounded-xl w-full text-xl p-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isEmailValid && email && (
                  <p className=" text-rose-500">유효하지 않은 이메일입니다.</p>
                )}
              </div>
              <div className="w-full mb-5">
                <div className="flex flex-row justify-between">
                  <div className="mb-3 whitespace-nowrap">비밀번호</div>
                  {/* <div className="text-[#92C7CF] cursor-pointer hover:underline whitespace-nowrap">비밀번호 분실</div> */}
                </div>
                <input
                  type="password"
                  className="border-2 border-[#92C7CF] rounded-xl w-full text-xl p-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      handleLogin();
                    }
                  }}
                />
              </div>
              <button
                disabled={!isEmailValid}
                className="w-full bg-[#92C7CF] text-white text-3xl p-5 rounded-xl shadow-xl whitespace-nowrap"
                onClick={handleLogin}
              >
                로그인
              </button>
            </div>
            <div className="w-full flex flex-row justify-between ">
              <div className="border-2 h-0 border-gray-300 w-[40%] mr-10 mt-2" />
              <div className="w-fit whitespace-nowrap">또는</div>
              <div className="border-2 h-0 border-gray-300 w-[40%] ml-10 mt-2" />
            </div>
            <img
              src={KakaoIcon}
              alt="kakao icon"
              className="w-20 h-20 mx-2 shadow-2xl mt-10"
              onClick={() =>
                window.location.replace(
                  `${process.env.REACT_APP_BACKEND_DEPLOY}/oauth2/authorization/kakao`
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
