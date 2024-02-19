import React from 'react'

import dummyImage1 from '../../assets/20231010_084411.jpg' // 임시 이미지
import { CommentType } from "@/src/types/CommentType"
import { Button } from "../../ui/button"
import { deleceComment } from "../../api/feed/DeleteComment"

interface CommentComponent extends CommentType { }

const Comment: React.FC<CommentComponent> = ({
  content, createdAt, nickname, id
}) => {

  const handleDeleteComment = async () => {
    const response = await deleceComment(id);
    if (response) {
      alert('삭제 완료')
    }
  }
  return (
    <div className="w-full h-fit flex items-start mb-5">
      <img src={dummyImage1} alt="dummy profile" className="w-16 h-16 rounded-full mr-5" />
      <section className="w-full flex-col">
        <div className="flex items-end">
          <div className="text-xl mr-5 font-bold">
            {nickname}
          </div>
          <div>
            {new Date(createdAt).toDateString()}
          </div>
          <Button className="text-red" onClick={handleDeleteComment}>삭제</Button>
        </div>
        <div className="text-2xl">
          {content}
        </div>
      </section>
    </div>
  )
}

export default Comment