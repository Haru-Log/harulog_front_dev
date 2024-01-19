import React from 'react'
import Cards from "../components/Feed/Cards"
import { dummy_sample } from "../types/FeedItem.type"
import CreateButton from '../components/CreateButton'
import FilterGroup from '../components/FilterGroup'

const FeedPage = () => {

  // api 불러서 작업할 것이지만 지금은 dummy

  return (
    <div className='flex'>
      <FilterGroup />
      <CreateButton />
      <Cards cards={dummy_sample} />
    </div>
  )
}

export default FeedPage
