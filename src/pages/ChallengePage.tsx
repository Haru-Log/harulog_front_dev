import { useState } from "react"
import CreateButton from '../components/CreateButton'
import FilterGroup from '../components/FilterGroup'

const ChallengePage = () => {

  const [selectedValue, setSelectedValue] = useState("전체")


  return (
    <div className='flex'>
      <FilterGroup selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
      <CreateButton />
    </div>
  )
}

export default ChallengePage
