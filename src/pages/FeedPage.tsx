import React, { useState } from 'react'
import Cards from "../components/Feed/Cards"
import { dummy_sample } from "../types/FeedItem.type"
import CreateButton from '../components/CreateButton'
import FilterGroup from '../components/FilterGroup'

const FeedPage = () => {

  const [selectedValue, setSelectedValue] = useState("전체")

  // api 불러서 작업할 것이지만 지금은 dummy

  return (
    <div className='flex flex-col'>
      <FilterGroup selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
      <Cards cards={dummy_sample} />
      <CreateButton />
    </div>
  )
}

export default FeedPage
