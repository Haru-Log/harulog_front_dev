import React from 'react'
import Cards from "../components/Feed/Cards"

// dummy Images
import dummyImage1 from '../assets/20231010_084411.jpg'
import dummyImage2 from '../assets/20231121_091209.jpg'
import dummyImage3 from '../assets/achievement-5597527_640.png'
import dummyImage4 from '../assets/kakao_icon.png'
import dummyImage5 from '../assets/20231029_091459.png'
import dummyImage6 from '../assets/Screenshot_20200427-152644_Facebook.png'
import dummyImage7 from '../assets/Screenshot_20220714-051432_Instagram.png'
import dummyImage8 from '../assets/FB_IMG_1695830410274.jpg'
import dummyImage9 from '../assets/FB_IMG_1613092264309.jpg'
import dummyImage10 from '../assets/20231020_090539.jpg'


const FeedPage = () => {

  const dummy_sample = [
    {name: '인상 깊었던 구절', img: dummyImage1, likes: 3, comment: 5},
    {name: '인상 깊었던 구절', img: dummyImage2, likes: 3, comment: 5},
    {name: '인상 깊었던 구절', img: dummyImage3, likes: 3, comment: 5},
    {name: '인상 깊었던 구절', img: dummyImage4, likes: 3, comment: 5},
    {name: '인상 깊었던 구절', img: dummyImage5, likes: 3, comment: 5},
    {name: '인상 깊었던 구절', img: dummyImage6, likes: 3, comment: 5},
    {name: '인상 깊었던 구절', img: dummyImage7, likes: 3, comment: 5},
    {name: '인상 깊었던 구절', img: dummyImage8, likes: 3, comment: 5},
    {name: '인상 깊었던 구절', img: dummyImage9, likes: 3, comment: 5},
    {name: '인상 깊었던 구절', img: dummyImage10, likes: 3, comment: 5},
  ]

  return (
    <div>
      <Cards cards={dummy_sample} />
    </div>
  )
}

export default FeedPage
