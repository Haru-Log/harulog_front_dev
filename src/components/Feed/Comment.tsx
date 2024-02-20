import React, { useState } from 'react'
import dummyImage1 from '../../assets/20231010_084411.jpg' // 임시 이미지
import { Button } from "../../ui/button"
import { Textarea } from "../../ui/textarea"
import ChildComment from './ChildComment';
import { CommentType } from './../../types/CommentType';

interface CommentComponent extends CommentType {
  post_id: number
  submitComment: any
  handleDeleteComment: any
  handleEditComment: any
}

const Comment: React.FC<CommentComponent> = ({
  content, createdAt, nickname, id, post_id, submitComment, children, handleDeleteComment, handleEditComment
}) => {

  const [displayReplyInput, setDisplayReplyInput] = useState(false)
  const [commentContent, setCommentContent] = useState("");
  const [displayChild, setDisplayChild] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editValue, setEditValue] = useState(content);

  return (
    <div className=" mb-5">
      <div className="w-full h-fit flex items-start mb-3">
        <img src={dummyImage1} alt="dummy profile" className="w-16 h-16 rounded-full mr-5" />
        <section className="w-full flex-col">
          <div className="flex items-end w-full">
            <div className="text-xl mr-5 font-bold">
              {nickname}
            </div>
            <div>
              {new Date(createdAt).toDateString()}
            </div>
            {localStorage.getItem('nickname') === nickname ?
              <>
                <Button className="text-black hover:text-[#92c7cf] w-fit ml-5" onClick={() => setIsEdit(true)}>수정</Button>
                <Button className="text-black hover:text-red-500 w-fit" onClick={() => handleDeleteComment(id)}>삭제</Button>
              </> : <></>
            }
          </div>
          <div className="text-2xl">
            {isEdit ?
              <form onSubmit={() => {
                handleEditComment(editValue, id)
                setIsEdit(false)
                setEditValue(content)
              }} className="w-full relative flex">
                <Textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} placeholder="댓글 작성" className="pr-14 resize-none h-fit scrollbar-hide" />
                <Button type="submit" className="absolute right-1 text-[#92C7CF]">전송</Button>
              </form>
              :
              content}
          </div>
        </section>
      </div>
      <div className="flex">
        {!displayReplyInput && <div className="cursor-pointer hover:text-[#92C7CF]" onClick={() => setDisplayReplyInput(!displayReplyInput)}>답글 달기</div>}
        {children && children.length > 0 && !displayChild && <div className="cursor-pointer ml-4 hover:text-[#92C7CF]" onClick={() => setDisplayChild(!displayChild)}>답글 더보기</div>}
      </div>
      {displayReplyInput && <>
        <form onSubmit={(e) => {
          submitComment(e, id, post_id, commentContent)
          setCommentContent("")
        }} className="w-full relative flex">
          <Textarea value={commentContent} onChange={(e) => setCommentContent(e.target.value)} placeholder="댓글 작성" className="pr-14 resize-none h-fit scrollbar-hide" />
          <Button type="submit" className="absolute right-1 text-[#92C7CF]">전송</Button>
        </form>
        <div className="cursor-pointer hover:text-[#92C7CF]" onClick={() => setDisplayReplyInput(!displayReplyInput)}>취소</div>
      </>}
      <div className="ml-10 mb-10">
        {displayChild &&
          <>
            {children?.map((it: CommentType) =>
              <ChildComment {...it} handleDeleteComment={handleDeleteComment} handleEditComment={handleEditComment} />
            )}
            {<div className="cursor-pointer ml-4 hover:text-[#92C7CF]" onClick={() => setDisplayChild(!displayChild)}>축소하기</div>}
          </>
        }
      </div>
    </div>
  )
}

export default Comment