import React, { useEffect, useState } from 'react'
import MagicGrid from "react-magic-grid"
import FeedCard from "./FeedCard"
import { useFilterStore } from 'src/zustand/filterStore.ts';

const Cards = ({ data }) => {

  const { selectedValue } = useFilterStore();
  const filteredCards = selectedValue === '전체' ? data : data.filter(item => item.categoryName === selectedValue);
  const [isImgLoaded, setIsImgLoaded] = useState([])

  useEffect(() => {
    setIsImgLoaded(data.map(x => false))
  }, [data])

  return (
    <div className="w-full h-full p-12 mt-8">
      {
        // isImgLoaded && isImgLoaded.reduce((prev, curr) => prev && curr, true) &&
        <MagicGrid items={data.length} gutter={30} animate={true}>
          {filteredCards.map((item, idx) => (
            <FeedCard key={item.id} {...item} idx={idx} setIsImgLoaded={setIsImgLoaded} isImgLoaded={isImgLoaded} />
          ))}
        </MagicGrid>}
    </div>
  )
}

export default Cards