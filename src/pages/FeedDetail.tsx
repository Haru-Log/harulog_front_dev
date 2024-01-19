import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { FeedItem, dummy_sample } from "../types/FeedItem.type"
import dummyImage1 from '../assets/20231010_084411.jpg' // 임시 이미지
import { Heart, Pencil } from "lucide-react"
import { category_themes, dummy_categories } from "../types/Category.type"
import { dummy_comment } from "../types/Comment.type"
import Comment from "../components/Feed/Comment"


const FeedDetail = () => {

  const post_id = parseInt(useParams().id || "");
  const navigate = useNavigate();
  const [post, setPost] = useState<FeedItem>();
  const [theme, setTheme] = useState<string>("")
  const [category, setCategory] = useState("");


  useEffect(() => {
    if (post_id) {
      setPost(dummy_sample.filter(x => x.post_id === post_id)[0]);

      // 그리고 포스트 아이디 불러오면 프로필 정보 불러오는 그것도 추가 해야함
    } else {
      navigate(-1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    if (post) {
      setTheme(category_themes[post!.category_idx - 1])
      setCategory(dummy_categories.filter((x) => post && x.category_id === post!.category_idx)[0]?.category)
    }
  }, [post])


  return (
    <div className="w-full h-full p-12 flex flex-col">
      <section className="w-full flex flex-row items-center h-fit justify-between mb-5">
        <div className="flex flex-row items-center h-fit">
          <img src={dummyImage1} alt="프로필 이미지" className="w-20 h-20 rounded-full mr-10" />
          <div className="items-center text-3xl whitespace-nowrap font-bold">이강혁</div>
        </div>
        <div className="cursor-pointer" onClick={() => navigate(`/feed/edit/${post_id}`)}>
          <Pencil size={30} />
        </div>
      </section>
      <section className="w-full mb-5">
        <img src={dummyImage1} alt="post" className="max-h-[100vh] w-full object-cover" />
      </section>
      <section className="flex items-center justify-between">
        <div className="flex flex-row">
          <div className={`text-white px-3 py-1 rounded-full h-fit w-fit text-center mr-3 text-2xl ${theme}`}>
            {category}
          </div>
          <div className={`text-white px-3 py-1 rounded-full h-fit w-fit text-center text-2xl ${theme}`}>
            60분
          </div>
        </div>
        <div className="text-xl">
          {post && post?.created_at.toLocaleDateString()}
        </div>
      </section>
      <section className="mt-5 flex items-center">
        <Heart size={50}/>
        <div className="ml-5 text-4xl font-bold">
          {post && post.like}
        </div>
      </section>
      <section className="mt-5 text-4xl">
        {post && post.content}
      </section>
      <section className="mt-10">
        {dummy_comment.map(it => (
          <Comment key={it.comment_id} />
        ))}
      </section>
    </div>
  )
}

export default FeedDetail
