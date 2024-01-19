import React from 'react'
import achievement from '../../assets/achievement-5597527_640.png'

const Slogan = () => {
  return (
    <div className="flex flex-row w-full align-baseline max-h-64">
        <div className="flex flex-col w-[60%] items-center mt-10">
          <div className="flex flex-col">
            <div className="text-3xl mb-5">
              매일 1%의 성장기록
            </div>
            <div>
              운동과 독서, 기상 인증 등 목표가 무엇이든 HaruLog에는 사람들이 각자의 성장을 공유합니다.
              <br />
              매일 반복되는 하루, 기록을 통해 성장하는 자신을 발견해보세요.
            </div>
          </div>
          <button className="bg-[#92C7CF] w-fit px-5 py-2 text-white rounded-xl mt-5">
            가입하기
          </button>
        </div>
        <div className="w-[40%] flex">
          <img src={achievement} alt="Achievement" className="w-full max-w-96 h-fit min-w-60 object-contain" />
        </div>
      </div>
  )
}

export default Slogan