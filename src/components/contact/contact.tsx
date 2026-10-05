import type { ContactInfo } from '@/types/chat';

interface ContactInfoProps {
  contact: ContactInfo | undefined;
}

const Contact = ({ contact }: ContactInfoProps) => {
  const { contactName, name, phoneNumber, avatar } = contact ?? {};
  const displayName = contactName || name || phoneNumber;
  return (
    <div className='bg-primary flex items-center p-4 gap-4 h-[72px] shrink-0'>
      {contact && (
        <>
          <img src={avatar} alt='avatar' className='w-10 h-10 rounded-full' />
          {displayName}
        </>
      )}
    </div>
  );
};

export default Contact;
