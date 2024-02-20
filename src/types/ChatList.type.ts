export interface ChatList {
  challengeName: string;
  roomId: number;
  roomType: string;
  unreadCount: number;
  updatedAt: string;
  users: chatUser[];
}

export interface chatUser {
  nickname: string;
  profileImage: string;
}