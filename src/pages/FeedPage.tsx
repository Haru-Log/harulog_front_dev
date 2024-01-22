import React, { useEffect, useState } from 'react'
import Cards from "../components/Feed/Cards"
import { FeedItem, dummy_sample } from "../types/FeedItem.type"
import CreateButton from '../components/CreateButton'
import FilterGroup from '../components/FilterGroup'
import { dummy_categories } from "../types/Category.type"

const FeedPage = () => {

  const [selectedValue, setSelectedValue] = useState("전체")
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [filtered, setFiltered] = useState<FeedItem[]>([])

  useEffect(() => {
    // api 불러서 작업할 것이지만 지금은 dummy
    setFeedItems(dummy_sample);
    setFiltered(dummy_sample);
  }, [])

  useEffect(() => {
    if (selectedValue !== '전체') {
      const selectedId = dummy_categories.find(x => x.category_name === selectedValue)?.category_id
      setFiltered(feedItems.filter((it) => it.category_idx === selectedId))
    } else {
      setFiltered(feedItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, feedItems])

  return (
    <div className='flex flex-col'>
      <FilterGroup />
      {filtered.length ? <Cards cards={filtered} /> : <></>}
      <CreateButton />
    </div>
  )
}

export default FeedPage
