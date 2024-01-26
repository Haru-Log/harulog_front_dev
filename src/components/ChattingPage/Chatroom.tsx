import React from 'react'

const Chatroom = () => {
  return (
    <div className='m-5'>
              <div className="flex items-start gap-2.5">
                <img className="w-8 h-8 rounded-full" src="https://avatars.githubusercontent.com/u/64907633?v=4" alt='Jese' />
                <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">김동진</span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                  </div>
                  <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">오늘 챌린지 성공하셨나요?</p>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">전송됨</span>
                </div>
              </div>
            </div>
  )
}

export default Chatroom
