import React from 'react'
import MagicGrid from "react-magic-grid"
import Card from "./Card"

const Cards = ({ cards }) => {
  return (
    <div className="w-full h-full p-12">
      <MagicGrid items={cards.length} gutter={30} animate={true}>
        {cards.map(item => (
            <Card key={item.post_id} {...item} />
        ))}
      </MagicGrid>
    </div>
  )
}

export default Cards