import React, { useContext, useRef, useState } from 'react'
import { Link } from "react-router-dom";
import KakaoIcon from '../../assets/kakao_icon.png'
import { SetModalContext } from "../../App";
import useOnClickOutside from "../../hooks/useOnClickOutside";


const RegisterModal = () => {

  const setRegisterModal = useContext(SetModalContext)?.setRegisterModal;
  const setLoginModal = useContext(SetModalContext)?.setLoginModal;

  const [name, setName] = useState("")
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passchk, setPasschk] = useState("");

  const ref: any = useRef();
  useOnClickOutside(ref, () => { setRegisterModal(false) });

  return (
    <div className="z-50 absolute font-ibm">
      <div className="fixed inset-3 flex justify-center">
        <div className="w-[50%] max-w-[800px] h-[90vh] relative shadow-2xl flex rounded-xl overflow-auto duration-[400ms] delay-[2s] ease-in-out transition-all fade-in-40 bg-[#ececec] scrollbar-hide"
          ref={ref}>
          <div className="w-full flex flex-col items-center p-10">
            <div className="text-6xl mb-5 whitespace-nowrap font-orbit">
              HaruLog
            </div>
            <div className="text-3xl whitespace-nowrap">
              회원가입
            </div>
            <div className="flex flex-row mt-5 whitespace-nowrap">
              <div>이미 회원이신가요? </div>
              <div className="text-[#92C7CF] ml-3 cursor-pointer mb-5 hover:underline"
                onClick={() => {
                  setRegisterModal(false)
                  setLoginModal(true)
                }}>로그인</div>
            </div>
            <div className="w-full mb-10">
              <div className="w-full mb-5">
                <div className="mb-3 whitespace-nowrap">이름</div>
                <input type="text" className="border-2 border-[#92C7CF] rounded-xl w-full text-xl p-3" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="w-full mb-5">
                <div className="mb-3 whitespace-nowrap">닉네임</div>
                <input type="text" className="border-2 border-[#92C7CF] rounded-xl w-full text-xl p-3" value={nickname} onChange={(e) => setNickname(e.target.value)} />
              </div>
              <div className="w-full mb-5">
                <div className="mb-3 whitespace-nowrap">이메일</div>
                <input type="email" className="border-2 border-[#92C7CF] rounded-xl w-full text-xl p-3" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="w-full mb-5">
                <div className="flex flex-row justify-between">
                  <div className="mb-3 whitespace-nowrap">비밀번호</div>
                  <div className="text-[#92C7CF] cursor-pointer hover:underline whitespace-nowrap">비밀번호 분실</div>
                </div>
                <input type="password" className="border-2 border-[#92C7CF] rounded-xl w-full text-xl p-3" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="w-full mb-5">
                <div className="mb-3 whitespace-nowrap">비밀번호 확인</div>
                <input type="password" className="border-2 border-[#92C7CF] rounded-xl w-full text-xl p-3" value={passchk} onChange={(e) => setPasschk(e.target.value)} />
              </div>
              <div className="flex justify-start flex-col">
                <div className="mb-3">데이터 사용 동의</div>
                <div className="flex flex-row"><input type="checkbox" className="mr-3" /><div>이용약관에 동의합니다.</div></div>
                <div className="flex flex-row mt-3 mb-5"><input type="checkbox" className="mr-3" /><div>개인정보 수집 및 이용에 동의합니다.</div></div>
              </div>
              <button className="w-full bg-[#92C7CF] text-white text-3xl p-5 rounded-xl shadow-xl whitespace-nowrap">
                회원가입
              </button>
            </div>
            <div className="w-full flex flex-row justify-between ">
              <div className="border-2 h-0 border-gray-300 w-[40%] mr-10 mt-2" />
              <div className="w-fit whitespace-nowrap">또는</div>
              <div className="border-2 h-0 border-gray-300 w-[40%] ml-10 mt-2" />
            </div>
            <Link to={''}><img src={KakaoIcon} alt="kakao icon" className="w-20 h-20 mx-2 shadow-2xl mt-5 mb-5" /></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterModal
