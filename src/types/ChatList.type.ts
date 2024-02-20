export interface ChatList {
  challengeName: string;
  roomId: string;
  roomType: string;
  unreadCount: number;
  updatedAt: string;
  users: chatUser[];
}

export interface chatUser {
  nickname: string;
  profileImage: string;
}