import Card from "./Card"
import { useFilterStore } from "src/zustand/filterStore.ts"
import { getCategoryNameById } from "src/utils/getCategoryNameById.tsx"

const Cards = ({ data }) => {
  const { selectedValue } = useFilterStore();
  const selectedCategoryName = selectedValue === '전체' ? '' : getCategoryNameById(selectedValue);

  const filteredCards = selectedCategoryName === '' ? data : data.filter(item => item.category_id === selectedCategoryName);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16 mx-7">
      {filteredCards.map(item => (
        <Card key={item.challenge_id} {...item} />
      ))}
    </div>
  )
}

export default Cards
