import { useGlobalStore } from '@/hooks/use-global-provider';
import CredentialsForm from './credentials-form/credentials-form';
import PhoneForm from './phone-form/phone-form';

const CredentialsModal = () => {
  const { isAuthorized, phone } = useGlobalStore((store) => store);

  if (isAuthorized && phone) return null;

  const ContentComponent = isAuthorized ? PhoneForm : CredentialsForm;

  return (
    <div className='absolute bg-[#2264637d] flex justify-center items-center w-full h-full'>
      <div className='bg-primary border-1 border-on-primary h-[500px] w-[400px] rounded-md flex'>
        <ContentComponent />
      </div>
    </div>
  );
};

export default CredentialsModal;
