import React from 'react'

import dummyImage1 from '../../assets/20231010_084411.jpg' // 임시 이미지

const Comment = () => {
  return (
    <div className="w-full h-fit flex items-start mb-5">
      <img src={dummyImage1} alt="dummy profile" className="w-16 h-16 rounded-full mr-5" />
      <section className="w-full flex-col">
        <div className="flex items-end">
          <div className="text-xl mr-5 font-bold">
            이강혁
          </div>
          <div>
            skfWk
          </div>
        </div>
        <div className="text-2xl">
          ㄹㅇㅋㅋ <br></br>
          gsdfgdfsg <br/>
          gsdfgdsfgd
        </div>
      </section>
    </div>
  )
}

export default Comment