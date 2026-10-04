import type { ChatMessage } from '@/types/chat';
import moment from 'moment';

interface MessageProps {
  message: ChatMessage;
}

const baseStyle =
  'px-2 py-1 rounded-md w-fit max-w-[60%] relative flex items-end gap-2';
const outgoingStyle = `${baseStyle} 
  bg-secondary 
  self-end   
  before:content-['']
  before:absolute
  before:top-0
  before:-right-2
  before:border-[8px]
  before:border-t-secondary
  before:border-r-transparent
  before:border-b-transparent
  before:border-l-transparent`;

const incomingStyle = `${baseStyle} 
  bg-white
  self-start
  before:content-['']
  before:absolute
  before:top-0
  before:-left-2
  before:border-[8px]
  before:border-t-white
  before:border-r-transparent
  before:border-b-transparent
  before:border-l-transparent`;

const Message = ({ message }: MessageProps) => {
  const className = message.type === 'outgoing' ? outgoingStyle : incomingStyle;

  const time = moment.unix(message.timestamp).format('HH:mm');

  return (
    <div className={className}>
      <span className='text-sm'>{message.textMessage}</span>
      <span className='text-[10px] text-gray-500'>{time}</span>
    </div>
  );
};

export default Message;
