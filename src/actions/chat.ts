import type { Credentials } from '@/types/auth';
import type {
  ChatMessage,
  ContactInfo,
  DeleteNotificationParams,
  GetChatHistoryParams,
  GetContactInfoParams,
  SendMessageParams,
} from '@/types/chat';
import { buildUrl } from '@/utils/url';

const CHAT_ACTIONS = {
  GET_CHAT_HISTORY: 'getChatHistory',
  GET_CONTACT_INFO: 'getContactInfo',
  SEND_MESSAGE: 'sendMessage',
  RECEIVE_NOTIFICATION: 'receiveNotification',
  DELETE_NOTIFICATION: 'deleteNotification',
} as const;

export const sendMessage = async ({
  idInstance,
  apiTokenInstance,
  phone,
  message,
}: SendMessageParams) => {
  const response = await fetch(
    buildUrl(idInstance, apiTokenInstance, CHAT_ACTIONS.SEND_MESSAGE),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId: `${phone}@c.us`,
        message,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
};

export const getChatHistory = async ({
  idInstance,
  apiTokenInstance,
  phone,
  count = 100,
}: GetChatHistoryParams): Promise<ChatMessage[]> => {
  const response = await fetch(
    buildUrl(idInstance, apiTokenInstance, CHAT_ACTIONS.GET_CHAT_HISTORY),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId: `${phone}@c.us`,
        count,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`error: ${response.status}`);
  }

  const messages: ChatMessage[] = await response.json();

  return messages
    .map((message) => ({
      ...message,
      textMessage: message.textMessage ?? message.extendedTextMessageData?.text,
    }))
    .filter((message) => Boolean(message.textMessage));
};

export const getContactInfo = async ({
  idInstance,
  apiTokenInstance,
  phone,
}: GetContactInfoParams): Promise<ContactInfo> => {
  const response = await fetch(
    buildUrl(idInstance, apiTokenInstance, CHAT_ACTIONS.GET_CONTACT_INFO),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId: `${phone}@c.us`,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`GREEN-API error: ${response.status}`);
  }

  return response.json();
};

export const receiveNotification = async ({
  idInstance,
  apiTokenInstance,
}: Credentials) => {
  const response = await fetch(
    buildUrl(
      idInstance,
      apiTokenInstance,
      CHAT_ACTIONS.RECEIVE_NOTIFICATION,
      '?receiveTimeout=60',
    ),
  );

  if (!response.ok) {
    throw new Error(`GREEN-API error: ${response.status}`);
  }

  return response.json();
};

export const deleteNotification = async ({
  idInstance,
  apiTokenInstance,
  receiptId,
}: DeleteNotificationParams) => {
  const response = await fetch(
    buildUrl(
      idInstance,
      apiTokenInstance,
      CHAT_ACTIONS.DELETE_NOTIFICATION,
      `/${receiptId}`,
    ),
    {
      method: 'DELETE',
    },
  );

  if (!response.ok) {
    throw new Error(`GREEN-API error: ${response.status}`);
  }

  return response.json();
};
