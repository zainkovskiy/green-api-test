import { useChat } from '@/hooks/use-chat';
import Contact from '../contact/contact';
import Message from '../message/message';
import { Fragment, useEffect, useRef } from 'react';
import { groupMessagesByDate } from '@/utils/message';
import DateSeparator from '../date-separator/date-separator';

const MessagesContainer = () => {
  const { messages, contact } = useChat();

  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesRef.current;

    if (!container || !messages.length) return;

    container.scrollTop = container.scrollHeight;
  }, [messages]);

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className='grow-1 flex flex-col overflow-hidden'>
      <Contact contact={contact} />
      <div
        ref={messagesRef}
        className='grow-1 pr-20 pl-20 flex flex-col gap-4 pt-4 pb-4 items-center overflow-auto'
      >
        {Array.from(groupedMessages).map(([date, messages]) => (
          <Fragment key={date}>
            <DateSeparator date={date} />

            {messages.map((message) => (
              <Message message={message} key={message.idMessage} />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default MessagesContainer;
