import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { FeedItem, dummy_sample } from "../types/FeedItem.type"
import dummyImage1 from '../assets/20231010_084411.jpg' // 임시 이미지
import { Heart, Pencil } from "lucide-react"
import { dummy_comment } from "../types/Comment.type"
import Comment from "../components/Feed/Comment"


const FeedDetail = () => {

  const post_id = parseInt(useParams().id || "");
  const navigate = useNavigate();
  const [post, setPost] = useState<FeedItem>();
  const [post_image, setPost_image] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState<Date>();
  const [category, setcategory] = useState("")

  useEffect(() => {
    // api로 postID 요청해서 없으면 navigate를 통해 피드 페이지로 이동 시키기.
    if (post_id) {
      // 나중에는 api로 요청할 것
      setPost(dummy_sample.find(x => x.post_id === post_id));
    } else {
      navigate('/feed', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post_id])

  useEffect(()=>{
    if (post) {
      setPost_image(post.post_image);
      setContent(post.content)
      setcategory(post.category_name)

      //postId에 따라서 comment 불러오는 로직 추가해야함
    }
  }, [post])

  return (
    <div className="w-full flex justify-center">
      <div className="w-[50%] h-full p-12 flex flex-col">
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
          <img src={post_image} alt="post" className="max-h-[100vh] w-full object-cover" />
        </section>
        <section className="flex items-center justify-between">
          <div className="flex flex-row">
            <div className={`text-white px-3 py-1 rounded-full h-fit w-fit text-center mr-3 text-2xl bg-${category}`}>
              {category}
            </div>
            <div className={`text-white px-3 py-1 rounded-full h-fit w-fit text-center text-2xl bg-${category}`}>
              60분
            </div>
          </div>
          <div className="text-xl">
            {post && post?.created_at.toLocaleDateString()}
          </div>
        </section>
        <section className="mt-5 flex items-center">
          <Heart size={50} />
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

    </div>)
}

export default FeedDetail
