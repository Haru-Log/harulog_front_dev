import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import SearchResultList from '../components/SocialPage/SearchResultList';

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
        <div className="flex items-center space-x-2 w-full justify-center mt-5">
          <Input type="text" className="px-3 py-2 h-12" placeholder="유저 이름을 검색해보세요." />
          <Button className="w-[100px] h-12 px-3 py-2 bg-point hover:bg-point-hover active:bg-point-active"><Search color="#ffffff" /></Button>
        </div>
        <div className="flex items-center w-full justify-center">
        <SearchResultList />
        </div>
      </div>
    </div>
  )
}

export default SocialPage
