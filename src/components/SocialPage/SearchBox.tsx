import { Button } from 'src/ui/button'
import { Input } from 'src/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

const SearchBox = () => {
  return (
    <div className="flex items-center space-x-2 w-full justify-center mt-5">
      <Input type="text" className="px-3 py-2 h-12" placeholder="유저 이름을 검색해보세요." />
      <Button className="w-[90px] h-12 px-3 py-2 bg-point hover:bg-point-hover active:bg-point-active"><Search color="#ffffff" /></Button>
    </div>
  )
}

export default SearchBox
