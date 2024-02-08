import ChallengeCard from "./ChallengeCard"
import { useFilterStore } from "src/zustand/filterStore.ts"
// import { getCategoryNameById } from "src/utils/getCategoryNameById.tsx"

const Cards = ({ data }) => {
  const { selectedValue } = useFilterStore();
  const filteredCards = selectedValue === '전체' ? data : data?.filter(item => item.categoryName === selectedValue);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 mt-20 ml-10">
      {filteredCards?.map(item => (
        <ChallengeCard key={item.challengeId} {...item} />
      ))}
    </div>
  )
}

export default Cards
