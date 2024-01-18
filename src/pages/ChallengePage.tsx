import { PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from "src/ui/toggle-group"

const ChallengePage = () => {
  const [selectedValue, setSelectedValue] = useState("전체")
  console.log(selectedValue)
  return (
    <div className='flex'>
      <ToggleGroup type="single" value={selectedValue} onValueChange={setSelectedValue} className='ml-7'>
        <ToggleGroupItem value="전체">전체</ToggleGroupItem>
        <ToggleGroupItem value="공부">공부</ToggleGroupItem>
        <ToggleGroupItem value="운동">운동</ToggleGroupItem>
        <ToggleGroupItem value="독서">독서</ToggleGroupItem>
        <ToggleGroupItem value="기상">기상</ToggleGroupItem>
      </ToggleGroup>

      <PlusSquare color="#ffffff" />
    </div>
  )
}

export default ChallengePage
