import MessagesContainer from '../messages-container/messages-container';
import MessageField from '../ui/message-field/message-field';

const ChatContainer = () => {
  return (
    <div className='flex flex-col grow-1'>
      <MessagesContainer />
      <MessageField />
    </div>
  );
};

export default ChatContainer;
