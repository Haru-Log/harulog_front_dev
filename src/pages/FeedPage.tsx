import Cards from "../components/Feed/Cards"
import { FeedItem } from "../types/FeedItem.type"
import CreateButton from '../components/CreateButton'
import FilterGroup from '../components/FilterGroup'
import { useEffect, useState } from "react"
import { fetchFeedAll } from './../api/feed/FetchFeedAll';


const FeedPage = () => {

  const [feedItems, setFeedItems] = useState<FeedItem[]>([])

  useEffect(() => {

    const fetchFeedItems = async () => {
      try{
        const response = await fetchFeedAll();
        setFeedItems(response.data)
      } catch(error){
        console.log(error);
      }
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