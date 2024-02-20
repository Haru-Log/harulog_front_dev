export interface ChatRoom {
  roomId: string;
  userCount: number;
  messages?: Messages[];
}

export interface Messages {
  senderName: string;
  imageUrl: string;
  type: string;
  content: string;
  createdAt: string;
}