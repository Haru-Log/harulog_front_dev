import React from 'react'
import { ToggleGroup, ToggleGroupItem } from "src/ui/toggle-group"
import { useFilterStore } from '../zustand/filterStore';

const FilterGroup = () => {
  const { selectedValue, setSelectedValue } = useFilterStore();
  return (
    <div className='absolute left-0'>
      <ToggleGroup type="single" value={selectedValue} onValueChange={setSelectedValue} className='ml-7'>
        <ToggleGroupItem value="전체">전체</ToggleGroupItem>
        <ToggleGroupItem value="공부">공부</ToggleGroupItem>
        <ToggleGroupItem value="운동">운동</ToggleGroupItem>
        <ToggleGroupItem value="독서">독서</ToggleGroupItem>
        <ToggleGroupItem value="기상">기상</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

export default FilterGroup
