import Cards from "../components/Feed/Cards"
import { FeedItem } from "../types/FeedItem.type"
import CreateButton from '../components/CreateButton'
import FilterGroup from '../components/FilterGroup'
import { useEffect, useState } from "react"
import axios from "../api/axios"


const FeedPage = () => {

  const [feedItems, setFeedItems] = useState<FeedItem[]>([])

  useEffect(() => {

    const fetchFeedItems = async () => {
      const response = await axios.get('/feed')
      setFeedItems(response.data.data);
    }
    fetchFeedItems()

  }, [])

  return (
    <div className='flex flex-col font-ibm'>
      <FilterGroup />
      {feedItems.length > 0 && <Cards data={feedItems} />}
      <CreateButton />
    </div>
  )
}

export default FeedPage