import { useEffect, useState } from 'react';
import FeedCard from './FeedCard';
import { useFilterStore } from '@/zustand/filterStore';

const Cards = ({ data }) => {
  const { selectedValue } = useFilterStore();
  const filteredCards =
    selectedValue === '전체'
      ? data
      : data.filter((item) => item.categoryName === selectedValue);
  const [isImgLoaded, setIsImgLoaded] = useState([]);

  useEffect(() => {
    setIsImgLoaded(data.map((x) => false));
  }, [data]);

  return (
    <div className="w-full h-full p-12 mt-8">
      {filteredCards.length > 0 && (
        <div>
          {filteredCards.map((item, idx) => (
            <FeedCard
              key={item.id}
              {...item}
              idx={idx}
              setIsImgLoaded={setIsImgLoaded}
              isImgLoaded={isImgLoaded}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;
