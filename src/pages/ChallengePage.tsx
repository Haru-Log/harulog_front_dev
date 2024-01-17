import React, { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from "src/ui/toggle-group"

const ChallengePage = () => {
  const [selectedValue, setSelectedValue] = useState("전체")
  console.log(selectedValue)
  return (
    <div className='flex ml-7'>
      <ToggleGroup type="single" value={selectedValue} onValueChange={setSelectedValue}>
        <ToggleGroupItem value="전체">전체</ToggleGroupItem>
        <ToggleGroupItem value="공부">공부</ToggleGroupItem>
        <ToggleGroupItem value="운동">운동</ToggleGroupItem>
        <ToggleGroupItem value="독서">독서</ToggleGroupItem>
        <ToggleGroupItem value="기상인증">기상인증</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

export default ChallengePage
