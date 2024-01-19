export interface Comment{
  comment_id: number;
  post_id: number;
  user_id: number;
  parent_id?: number;
  created_at: Date;
  updated_at?: Date;
  content: string;
}

export const dummy_comment: Comment[] = [
  {
    comment_id: 1,
    post_id: 1,
    user_id: 1,
    created_at: new Date(),
    content: 'ㄹㅇㅋㅋ',
  },
  {
    comment_id: 2,
    post_id: 1,
    user_id: 1,
    created_at: new Date(),
    content: 'ㄹㅇㅋㅋ',
  },
]