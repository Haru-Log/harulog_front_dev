import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import KakaoIcon from '../assets/kakao_icon.png'

const LoginPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="z-50 absolute">
      <div className="fixed inset-0 bg-[rgb(0 0 0 / 71%)] "> 
        <div className="max-w-[800px] h-full flex justify-center">
          <div className="w-1/2 h-full flex flex-col items-center p-14">
            <div className="text-8xl mb-10 whitespace-nowrap">
              HaruLog
            </div>
            <div className="text-3xl whitespace-nowrap">
              로그인
            </div>
            <div className="flex flex-row mt-10 whitespace-nowrap">
              <div>아직 회원이 아니신가요? </div>
              <div className="text-main-color ml-3 cursor-pointer mb-5 hover:underline" onClick={() => navigate('/register')}>회원가입</div>
            </div>
            <div className="w-full mb-10">
              <div className="w-full mb-10">
                <div className="mb-3 whitespace-nowrap">이메일</div>
                <input type="email" className="border-2 border-main-color rounded-xl w-full text-xl p-3" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div className="w-full mb-16">
                <div className="flex flex-row justify-between">
                  <div className="mb-3 whitespace-nowrap">비밀번호</div>
                  <div className="text-main-color cursor-pointer hover:underline whitespace-nowrap">비밀번호 분실</div>
                </div>
                <input type="password" className="border-2 border-main-color rounded-xl w-full text-xl p-3" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <button className="w-full bg-main-color text-white text-3xl p-5 rounded-xl shadow-xl whitespace-nowrap">
                로그인
              </button>
            </div>
            <div className="w-full flex flex-row justify-between ">
              <div className="border-2 h-0 border-gray-300 w-[40%] mr-10 mt-2" />
              <div className="w-fit whitespace-nowrap">또는</div>
              <div className="border-2 h-0 border-gray-300 w-[40%] ml-10 mt-2" />
            </div>
            <Link to={''}><img src={KakaoIcon} alt="kakao icon" className="w-20 h-20 mx-2 shadow-2xl mt-10" /></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage