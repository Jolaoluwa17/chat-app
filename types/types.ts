export default interface Message {
  senderId: string;
  recipientId: string;
  content: string;
  sender?: {
    _id: string;
  };
  chatId: string;
}

export interface UserType {
  _id: string; // Add other properties as needed
  name: string;
  email: string;
  // Add any other properties that the user object has
}
