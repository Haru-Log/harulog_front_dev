import { CommentType } from "./CommentType";

export interface FeedItem {
  id: number;
  nickname: string;
  categoryName: string;
  content: string;
  imgUrl: string;
  createdAt: Date;
  updateAt?: Date;
  activityTime: number;
  goal: number;
  commentList?: CommentType[]
  likeCount: number;
  commentCount: number;
}