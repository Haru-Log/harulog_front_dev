import Cards from "../components/Feed/Cards"
import { dummy_sample } from "../types/FeedItem.type"
import CreateButton from '../components/CreateButton'
import FilterGroup from '../components/FilterGroup'

const FeedPage = () => {
  return (
    <div className='flex flex-col font-ibm'>
      <FilterGroup />
      <Cards data={dummy_sample} />
      <CreateButton />
    </div>
  )
}

export default FeedPage
