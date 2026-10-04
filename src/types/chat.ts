import type { Credentials } from './auth';

export interface ChatMessage {
  type: 'incoming' | 'outgoing';
  idMessage: string;
  timestamp: number;
  typeMessage: string;
  chatId: string;
  textMessage?: string;
  caption?: string;
  senderId?: string;
  senderName?: string;
  statusMessage?: string;
  sendByApi?: boolean;
  extendedTextMessageData?: {
    text: string;
  };
}

export interface DeleteNotificationParams extends Credentials {
  receiptId: number;
}

export interface GetContactInfoParams extends Credentials {
  phone: string;
}

export interface SendMessageParams extends GetContactInfoParams {
  message: string;
}

export interface GetChatHistoryParams extends GetContactInfoParams {
  count?: number;
}

export interface ContactInfo {
  avatar: string;
  base64Avatar: string;
  name: string;
  contactName: string;
  chatId: string;
  lastSeen: string | null;
  isBusiness: boolean;
  phoneNumber: string;
}
