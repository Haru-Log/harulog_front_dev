import { FeedItem } from "@/src/types/FeedItem.type"
import  { useEffect, useState } from 'react'

import { Scrollbar, Mousewheel, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/css/autoplay';


import FeedCard from "./FeedCard";
import { fetchFeedAll } from "../../api/feed/FetchFeedAll";

const FeedSlide = () => {

  const [data, setData] = useState<FeedItem[]>([])

  useEffect(() => {
    const fetchRandomFeed = async () => {
      const response = await fetchFeedAll();

      if (response && response.message === "OK") {
        setData(response.data.filter((_: FeedItem, idx: number) => idx < 10))
      }
    }
    fetchRandomFeed()
  }, [])

  return (
    <section className="pb-[2rem] w-full">
      <div className="w-full">
        <Swiper
          modules={[Scrollbar, Mousewheel, Autoplay]}
          loop={true}
          pagination={{ clickable: true }}
          centeredSlides={true}
          grabCursor={true}
          scrollbar={{ draggable: true }}
          mousewheel={{
            invert: false,
          }}
          autoplay={{
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              spaceBetween: 10,
              slidesPerView: 1,
            },
            468: {
              spaceBetween: 10,
              slidesPerView: 2,
            },
            768: {
              spaceBetween: 15,
              slidesPerView: 3,
            },
            1024: {
              spaceBetween: 15,
              slidesPerView: 4,
            },
            1280: {
              spaceBetween: 30,
              slidesPerView: 5,
            },
          }}
          className="pb-20"
        >
          {data.map((post, index) =>
            <SwiperSlide key={index}>
              <FeedCard {...post} />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </section>
  )
}

export default FeedSlide