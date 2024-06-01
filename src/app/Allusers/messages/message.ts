export interface Message {
    sender: string;
    recepient: string;
    subject: string;
    body: string;
    messageType: string;
    time: Date;
    userID: number;
    parentMsgID: number | null; // Nullable parentMsgID
    msgID:number| null;
  }