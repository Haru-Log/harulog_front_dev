import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { Pencil } from "lucide-react"
import Comment from "../components/Feed/Comment"
import { fetchFeedDetail } from "../api/feed/FetchFeedDetail"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { addComment } from "../api/feed/addComment"
import { CommentType } from "../types/CommentType"
import { useFeedStore } from "../zustand/feedStore"
import { deleceComment } from "../api/feed/DeleteComment"
import Heart from "react-animated-heart";
import { sendLike } from "../api/feed/sendLike"
import { cancelLike } from "../api/feed/cancelLike"
import { editComment } from "../api/feed/EditComment"
import { fetchImgFromFirebase } from "../api/fetchImgFirebase"


const FeedDetail = () => {

  const post_id = parseInt(useParams().id || "");
  const setFeed = useFeedStore(state => state.setFeed);
  const feed = useFeedStore(state => state.feed)
  const navigate = useNavigate();
  const [commentContent, setCommentContent] = useState("");
  const [liked, setLiked] = useState(false)
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    const fetchFeedDetails = async () => {
      try {
        const feedDetails = await fetchFeedDetail(post_id);
        setFeed({ ...feedDetails.data, createdAt: new Date(feedDetails.data.createdAt), updateAt: new Date(feedDetails.data.updateAt) })
        setLiked(feedDetails.data.likedByUser)

        const profileImg = await fetchImgFromFirebase(feedDetails.data.profileImg);
        setProfileImg(profileImg);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchFeedDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitComment = async (e: any, id = 0, postId: number = post_id, content = commentContent) => {
    e.preventDefault()
    const response = await addComment(postId, id, content);
    if (response) {
      const newComment = await fetchFeedDetail(post_id);
      setFeed({
        ...feed,
        commentList: newComment.data.commentList
      })
      setCommentContent("")
    }
  }

  const handleDeleteComment = async (id: number) => {
    const response = await deleceComment(id);
    if (response) {
      alert('삭제 완료')
      const newComment = await fetchFeedDetail(post_id);
      setFeed({
        ...feed,
        commentList: newComment.data.commentList
      })
      setCommentContent("")
    }
  }

  const handleLike = async () => {
    if (liked) {
      setLiked(false);
      const response = await cancelLike(post_id);
      if (response) {
        setFeed({
          ...feed,
          likeCount: response.data.likeCount
        })
      }
    } else {
      setLiked(true);
      const response = await sendLike(post_id);
      if (response) {
        setFeed({
          ...feed,
          likeCount: response.data.likeCount
        })
      }
    }
  }

  const handleEditComment = async (content: string, commentId: number) => {
    const response = await editComment(commentId, content);
    if (response) {
      alert('수정 완료')
      const newComment = await fetchFeedDetail(post_id);
      setFeed({
        ...feed,
        commentList: newComment.data.commentList
      })
      setCommentContent("")
    }
  }

  return (
    <div className="w-full flex justify-center font-ibm pt-5">
      <div className="w-[50%] h-full p-12 flex flex-col">
        <section className="w-full flex flex-row items-center h-fit justify-between mb-5">
          <div className="flex flex-row items-center h-fit">
            <img src={profileImg} alt="프로필 이미지" className="w-20 h-20 rounded-full mr-10 cursor-pointer" onClick={() => navigate(`/profile/${feed.nickname}`)} />
            <div className="items-center text-3xl whitespace-nowrap font-bold cursor-pointer" onClick={() => navigate(`/profile/${feed.nickname}`)}>{feed?.nickname}</div>
          </div>
          {
            localStorage.getItem('nickname') === feed.nickname ?
              <div className="cursor-pointer" onClick={() => navigate(`/feed/edit/${post_id}`)}>
                <Pencil size={30} />
              </div>
              :
              <></>}
        </section>
        <section className="w-full mb-5">
          <img src={feed?.imgUrl} alt="post" className="max-h-[100vh] w-full object-cover" />
        </section>
        <section className="flex items-center justify-between">
          <div className="flex flex-row">
            <div className={`text-white px-3 py-1 rounded-full h-fit w-fit text-center mr-3 text-2xl bg-${feed?.categoryName} whitespace-nowrap`}>
              {feed?.categoryName}
            </div>
            <div className={`text-white px-3 py-1 rounded-full h-fit w-fit text-center text-2xl bg-${feed?.categoryName} whitespace-nowrap`}>
              {feed?.categoryName === "기상"
                ? `${Math.floor(feed.activityTime / 60)}시 ${feed.activityTime % 60}분`
                : `${feed?.activityTime}분`}
            </div>
          </div>
          <div className="text-xl whitespace-nowrap ml-5">
            {feed?.createdAt.toDateString()}
          </div>
        </section>
        <section className="mt-5 flex items-center h-fit">
          <Heart isClick={liked} onClick={() => handleLike()} />
          <div className="ml-5 text-4xl font-bold">
            {feed?.likeCount}
          </div>
        </section>
        <section className="mt-5 text-4xl">
          {feed?.content}
        </section>
        <form onSubmit={submitComment} className="w-full relative flex mt-5">
          <Textarea value={commentContent} onChange={(e) => setCommentContent(e.target.value)} placeholder="댓글 작성" className="pr-14 resize-none h-fit scrollbar-hide" />
          <Button type="submit" className="absolute right-1 text-[#92C7CF]">전송</Button>
        </form>
        <section className="mt-10">
          {feed?.commentList?.map((it: CommentType) => (
            <Comment key={it.id} {...it} post_id={post_id} submitComment={submitComment} handleDeleteComment={handleDeleteComment} handleEditComment={handleEditComment} />
          ))}
        </section>
      </div >

    </div >)
}

export default FeedDetail
