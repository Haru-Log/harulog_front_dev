import React from 'react'
import MagicGrid from "react-magic-grid"
import Card from "./Card"

const Cards = ({ cards }) => {
  return (
    <div className="w-full h-full p-12">
      <MagicGrid items={cards.length} gutter={50} animate={true}>
        {cards.map((item, idx) => (
            <Card key={idx} img={item.img} name={item.name} likes={item.likes} comment={item.comment} />
        ))}
      </MagicGrid>
    </div>

  )
}

export default Cards