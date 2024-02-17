import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import dummyImage1 from '../assets/20231010_084411.jpg' // 임시 이미지
import { Heart, Pencil } from "lucide-react"
import { dummy_comment } from "../types/Comment.type"
import Comment from "../components/Feed/Comment"
// import useFeedFetcher from "../hooks/useFeedFetcher"
import { FeedItem } from "../types/FeedItem.type"
import { fetchFeedDetail } from "../api/feed/FetchFeedDetail"


const FeedDetail = () => {

  const post_id = parseInt(useParams().id || "");
  // const selectedPost = useFeedFetcher(post_id);
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<FeedItem>()

  useEffect(() => {
    const fetchFeedDetails = async () => {
      try {
        const feedDetails = await fetchFeedDetail(post_id);
        setSelectedPost({...feedDetails.data, created_at: new Date(feedDetails.data.created_at), updated_at: new Date(feedDetails.data.updated_at)})

      } catch (error) {
        console.log(error);
      }
    }
    fetchFeedDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full flex justify-center font-ibm pt-5">
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
          <img src={selectedPost?.imgUrl} alt="post" className="max-h-[100vh] w-full object-cover" />
        </section>
        <section className="flex items-center justify-between">
          <div className="flex flex-row">
            <div className={`text-white px-3 py-1 rounded-full h-fit w-fit text-center mr-3 text-2xl bg-${selectedPost?.categoryName}`}>
              {selectedPost?.categoryName}
            </div>
            <div className={`text-white px-3 py-1 rounded-full h-fit w-fit text-center text-2xl bg-${selectedPost?.categoryName}`}>
              {selectedPost?.categoryName === "기상"
                ? `${Math.floor(selectedPost.activityTime / 60)}시 ${selectedPost.activityTime % 60}분`
                : `${selectedPost?.activityTime}분`}
            </div>
          </div>
          <div className="text-xl">
            {selectedPost?.createdAt.toDateString()}
          </div>
        </section>
        <section className="mt-5 flex items-center">
          <Heart size={50} />
          <div className="ml-5 text-4xl font-bold">
            {selectedPost?.likeCount}
          </div>
        </section>
        <section className="mt-5 text-4xl">
          {selectedPost?.content}
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
