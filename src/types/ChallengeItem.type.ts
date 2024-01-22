
export interface ChallengeItem {
  challenge_id: number;
  category_id: number;
  chatroom_id : number;
  challenge_title: string;
  challenge_content: string;
  challenge_goal: string;
  challenge_image: string;
  participants : number;
  submission : string;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at?: Date;
}