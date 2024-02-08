import ChallengeCard from "./ChallengeCard"
import { useFilterStore } from "src/zustand/filterStore.ts"
// import { getCategoryNameById } from "src/utils/getCategoryNameById.tsx"
import { useChallengeAllStore } from 'src/zustand/challengeAllStore';

const Cards = () => {
  const challenge = useChallengeAllStore(state => state.challenge);
  const selectedValue = useFilterStore(state => state.selectedValue); 

  const filteredCards = selectedValue === '전체' ? challenge : challenge.filter(item => item.categoryName === selectedValue);
console.log('filteredCards', filteredCards)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 mt-20 ml-10">
      {Array.isArray(filteredCards) && filteredCards.map(item => (
        <ChallengeCard key={item.challengeId} {...item} />
      ))}
    </div>
  )
}

export default Cards
