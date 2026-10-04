import { sendMessage } from '@/actions/chat';
import { useGlobalStore } from '@/hooks/use-global-provider';
import { SendHorizontal } from 'lucide-react';
import { useRef, useState, type ChangeEvent } from 'react';

const MessageField = () => {
  const { apiTokenInstance, idInstance, phone } = useGlobalStore(
    (store) => store,
  );
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
  };

  const handleSend = async () => {
    if (!idInstance || !apiTokenInstance || !phone) return;

    if (!value.trim()) return;

    try {
      await sendMessage({
        idInstance,
        apiTokenInstance,
        phone,
        message: value,
      });
    } catch (error) {
      console.error('error:', error);
    } finally {
      setValue('');

      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChangeArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    resizeTextarea();
  };

  return (
    <div className='mb-4 ml-12 mr-12 bg-primary rounded-[26px] border border-on-primary flex p-2 items-end'>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChangeArea}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder='Введите сообщение...'
        className='w-full resize-none overflow-y-auto p-2 outline-none'
      />
      <button
        onClick={handleSend}
        className='rounded-[100px] bg-on-primary w-[40px] h-[40px] flex cursor-pointer justify-center items-center min-w-[40px]'
      >
        <SendHorizontal className='w-6 h-6 stroke-primary' />
      </button>
    </div>
  );
};

export default MessageField;
