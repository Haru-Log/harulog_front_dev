import React from 'react'

import dummyImage1 from '../../assets/20231010_084411.jpg' // 임시 이미지
import { CommentType } from "@/src/types/CommentType"
import { Button } from "../../ui/button"

interface CommentComponent extends CommentType {
  handleDeleteComment: any
}

const ChildComment: React.FC<CommentComponent> = ({
  content, createdAt, nickname, id, handleDeleteComment
}) => {

  return (
    <div className=" mb-5">
      <div className="w-full h-fit flex items-start mb-3">
        <img src={dummyImage1} alt="dummy profile" className="w-16 h-16 rounded-full mr-5" />
        <section className="w-full flex-col">
          <div className="flex items-end">
            <div className="text-xl mr-5 font-bold">
              {nickname}
            </div>
            <div>
              {new Date(createdAt).toDateString()}
            </div>
            <Button className="text-red" onClick={() => handleDeleteComment(id)}>삭제</Button>
          </div>
          <div className="text-2xl">
            {content}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ChildComment