import React from 'react'
import CreateButton from '../components/CreateButton'
import FilterGroup from '../components/FilterGroup'

const FeedPage = () => {
  return (
    <div className='flex'>
      <FilterGroup />
      <CreateButton />
    </div>
  )
}

export default FeedPage
