
export class Message {
  type: 'message' | 'user_join' | 'user_leave';
  text?: string;
  userName: string;
  time: Date | string;
  fromMe?: boolean;
  userId?: string;
}
