import React from 'react'
import MagicGrid from "react-magic-grid"
import Card from "./Card"
import { useFilterStore } from 'src/zustand/filterStore.ts';

const Cards = ({ data }) => {

  const { selectedValue } = useFilterStore();
  const filteredCards = selectedValue === '전체' ? data : data.filter(item => item.category_name === selectedValue);

  return (
    <div className="w-full h-full p-12">
      <MagicGrid items={data.length} gutter={30} animate={true}>
        {filteredCards.map(item => (
            <Card key={item.post_id} {...item} />
        ))}
      </MagicGrid>
    </div>
  )
}

export default Cards