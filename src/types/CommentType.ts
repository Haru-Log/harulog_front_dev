export interface CommentType {
  content: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  nickname: string
  parentId: number;
  depth: 0
  children: CommentType[]
  profileImg: string;
}