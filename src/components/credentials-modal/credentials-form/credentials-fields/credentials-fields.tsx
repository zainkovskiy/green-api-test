import { useForm, type SubmitHandler } from 'react-hook-form';
import type { Credentials } from '@/types/auth';
import Input from '@/components/ui/input/input';
import Loader from '@/components/ui/loader/loader';
import Button from '@/components/ui/button/button';
import { useGlobalStore } from '@/hooks/use-global-provider';

interface CredentialsFieldsProps {
  isStateLoading: boolean;
}

const CredentialsFields = ({ isStateLoading }: CredentialsFieldsProps) => {
  const { setCredentials } = useGlobalStore((store) => store);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>();

  const onSubmit: SubmitHandler<Credentials> = async (data) => {
    setCredentials(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col grow-1'>
      <div className='p-4 border-b-1 border-on-primary'>
        Авторизация в WhatsApp
      </div>
      <div className='grow-1 p-4 flex flex-col gap-4'>
        <div>
          <Input
            className='w-full'
            label='idInstance'
            isError={Boolean(errors.idInstance?.message)}
            {...register('idInstance', {
              required: 'Поле обязательно для заполнения',
            })}
            disabled={isStateLoading}
          />
          <span className='block h-[15px] text-red-500 text-xs'>
            {errors.idInstance?.message}
          </span>
        </div>
        <div>
          <Input
            className='w-full'
            label='apiTokenInstance'
            isError={Boolean(errors.apiTokenInstance?.message)}
            {...register('apiTokenInstance', {
              required: 'Поле обязательно для заполнения',
            })}
            disabled={isStateLoading}
          />
          <span className='block h-[15px] text-red-500 text-xs'>
            {errors.apiTokenInstance?.message}
          </span>
        </div>
        {isStateLoading && (
          <div className='flex items-center justify-center grow-1'>
            <Loader />
          </div>
        )}
      </div>
      <div className='p-4 border-t-1 border-on-primary flex justify-end'>
        <Button disabled={isStateLoading} type='submit'>
          Продолжить
        </Button>
      </div>
    </form>
  );
};

export default CredentialsFields;
