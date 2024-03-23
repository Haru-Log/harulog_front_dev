import React, { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { fetchImgFromFirebase } from '../../api/fetchImgFirebase';
import { CommentType } from '@/types/CommentType';

interface CommentComponent extends CommentType {
  handleDeleteComment: any;
  handleEditComment: any;
}

const ChildComment: React.FC<CommentComponent> = ({
  content,
  createdAt,
  nickname,
  id,
  handleDeleteComment,
  handleEditComment,
  profileImg,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    fetchImgFromFirebase(profileImg).then((res) => {
      setImgUrl(res);
    });
  }, [profileImg]);

  return (
    <div className=" mb-5">
      <div className="w-full h-fit flex items-start mb-3">
        <img
          src={imgUrl}
          alt="dummy profile"
          className="w-16 h-16 rounded-full mr-5"
        />
        <section className="w-full flex-col">
          <div className="flex items-end">
            <div className="text-xl mr-5 font-bold">{nickname}</div>
            <div>{new Date(createdAt).toDateString()}</div>
            {localStorage.getItem('nickname') === nickname ? (
              <>
                <Button
                  className="text-black hover:text-[#92c7cf] w-fit ml-5"
                  onClick={() => setIsEdit(true)}
                >
                  수정
                </Button>
                <Button
                  className="text-black hover:text-red-500 w-fit"
                  onClick={() => handleDeleteComment(id)}
                >
                  삭제
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="text-2xl">
            {isEdit ? (
              <form
                onSubmit={() => {
                  handleEditComment(editValue, id);
                  setIsEdit(false);
                  setEditValue(content);
                }}
                className="w-full relative flex"
              >
                <Textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="댓글 작성"
                  className="pr-14 resize-none h-fit scrollbar-hide"
                />
                <Button
                  type="submit"
                  className="absolute right-1 text-[#92C7CF]"
                >
                  전송
                </Button>
              </form>
            ) : (
              content
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChildComment;
