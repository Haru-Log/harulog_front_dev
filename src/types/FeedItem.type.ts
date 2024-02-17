import { CommentType } from "./CommentType";

export interface FeedItem {
  id: number;
  nickname: string;
  category_name: string;
  content: string;
  imgUrl: string;
  like: number;
  comment: number;
  createdAt: Date;
  updateAt?: Date;
  activityTime: number;
  goal: number;
  commentList?: CommentType[]
  likeCount: number;
  commentCount: 6;
}