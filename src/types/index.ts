export interface User {
  id: string;
  username: string;
  avatar: string;
  bio?: string;
  followers: string[];
  following: string[];
}

export interface MediaItem {
  id: string;
  title: string;
  artist: string;
  type: 'audio' | 'video';
  url: string;
  thumbnail?: string;
  userId: string;
  likes: number;
  isOffline: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
}