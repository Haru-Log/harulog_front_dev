import Card from "./Card"

const Cards = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 mt-16">
      {cards.map(item => (
        <Card key={item.post_id} {...item} />
      ))}
    </div>
  )
}

export default Cards
