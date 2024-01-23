//dummyImages
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

export interface FeedItem {
  post_id: number;
  user_idx: number;
  category_name: string;
  content: string;
  post_image: string;
  like: number;
  comment: number;
  created_at: Date;
  updated_at?: Date;
}

export const dummy_sample: FeedItem[] = [
  {
    content: '인상 깊었던 구절', post_image: dummyImage1, like: 3, comment: 5, category_name: '운동', user_idx: 1, post_id: 1, created_at: new Date(1704750206013)
  },
  {
    content: '인상 깊었던 구절', post_image: dummyImage2, like: 3, comment: 5, category_name: '운동', user_idx: 1, post_id: 2, created_at: new Date(1704750206013 - 3)
  },
  {
    content: '인상 깊었던 구절', post_image: dummyImage3, like: 3, comment: 5, category_name: '기상', user_idx: 1, post_id: 3, created_at: new Date(1704750206013 - 6)
  },
  {
    content: '인상 깊었던 구절', post_image: dummyImage4, like: 3, comment: 5, category_name: '기상', user_idx: 1, post_id: 4, created_at: new Date(1704750206013 - 9)
  },
  {
    content: '인상 깊었던 구절', post_image: dummyImage5, like: 3, comment: 5, category_name: '공부', user_idx: 1, post_id: 5, created_at: new Date(1704750206013 - 12)
  },
  {
    content: '인상 깊었던 구절', post_image: dummyImage6, like: 3, comment: 5, category_name: '공부', user_idx: 1, post_id: 6, created_at: new Date(1704740206013 - 15)
  },
  {
    content: '인상 깊었던 구절', post_image: dummyImage7, like: 3, comment: 5, category_name: '독서', user_idx: 1, post_id: 7, created_at: new Date(1704740206013 - 15)
  },
  {
    content: '인상 깊었던 구절', post_image: dummyImage8, like: 3, comment: 5, category_name: '독서', user_idx: 1, post_id: 8, created_at: new Date(1704740206013 - 15)
  },
  {
    content: '인상 깊었던 구절', post_image: dummyImage9, like: 3, comment: 5, category_name: '독서', user_idx: 1, post_id: 9, created_at: new Date(1704740206013 - 15)
  },
  {
    content: '인상 깊었던 구절', post_image: dummyImage10, like: 3, comment: 5, category_name: '운동', user_idx: 1, post_id: 10, created_at: new Date(1704740206013 - 15)
  },
]