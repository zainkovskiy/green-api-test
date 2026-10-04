import moment from 'moment';
import type { ChatMessage } from '@/types/chat';

export const groupMessagesByDate = (messages: ChatMessage[]) => {
  const groups = new Map<string, ChatMessage[]>();

  messages.forEach((message) => {
    const date = moment.unix(message.timestamp).format('YYYY-MM-DD');

    const group = groups.get(date) ?? [];
    group.push(message);

    groups.set(date, group);
  });

  return groups;
};
