export interface ChatRoom {
  roomId: string;
  userCount: number;
  messages: Messages[];
}

export interface Messages {
  messageId: number;
  senderName: string;
  imageUrl: string;
  type: string;
  content: string;
  createdAt: string;
}