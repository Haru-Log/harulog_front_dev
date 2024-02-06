import React, { useState } from 'react'
import SearchResultList from '../components/SocialPage/SearchResultList';
import SearchBox from '../components/SocialPage/SearchBox';

const SocialPage = () => {
  const [searchToggle, setSearchToggle] = useState("all");
  return (
    <div className="w-full flex justify-center mt-10 font-ibm">
      <div className="w-full h-full flex flex-col mx-10 items-center">
        <div className="w-full flex justify-between">
          <div
            className={`w-full h-fit flex justify-center p-2 cursor-pointer items-center ${searchToggle === 'all' ? 'border-t-4 border-black font-bold' : 'border-t-2 border-t-gray-400 text-gray-400'}`}
            onClick={() => setSearchToggle('all')}
          >
            전체
          </div>
          <div
            className={`w-full h-fit flex justify-center p-2 cursor-pointer items-center  ${searchToggle === 'following' ? 'border-t-4 border-black font-bold' : 'border-t-2 border-t-gray-400 text-gray-400'}`}
            onClick={() => setSearchToggle('following')}
          >
            팔로잉
          </div>
          <div
            className={`w-full h-fit flex justify-center p-2 cursor-pointer items-center  ${searchToggle === 'follower' ? 'border-t-4 border-black font-bold' : 'border-t-2 border-t-gray-400 text-gray-400'}`}
            onClick={() => setSearchToggle('follower')}
          >
            팔로워
          </div>
        </div>
        <SearchBox />
        <SearchResultList />
      </div>
    </div>
  )
}

export default SocialPage
