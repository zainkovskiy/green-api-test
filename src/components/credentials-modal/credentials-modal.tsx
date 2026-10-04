import { useGlobalStore } from '@/hooks/use-global-provider';
import CredentialsForm from './credentials-form/credentials-form';
import PhoneForm from './phone-form/phone-form';

const CredentialsModal = () => {
  const { isAuthorized, phone } = useGlobalStore((store) => store);

  if (isAuthorized && phone) return null;

  const ContexComponent = isAuthorized ? PhoneForm : CredentialsForm;

  return (
    <div className='absolute bg-[#2264637d] flex justify-center items-center w-full h-full'>
      <div className='bg-primary border-1 border-on-primary h-[500px] w-[400px] rounded-md flex'>
        <ContexComponent />
      </div>
    </div>
  );
};

export default CredentialsModal;
