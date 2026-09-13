export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  distance: number;
  hobbies: string[];
  photos: string[];
  isVerified: boolean;
  isOnline: boolean;
  lastActive?: string;
}

export interface CurrentUser extends User {
  privacy: {
    showOnlineStatus: boolean;
    showLocation: boolean;
    allowMessagesFromUnmatched: boolean;
    endToEndEncryption: boolean;
  };
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
}
