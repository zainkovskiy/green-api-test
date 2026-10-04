import { useForm, type SubmitHandler } from 'react-hook-form';
import Input from '@/components/ui/input/input';
import Button from '@/components/ui/button/button';
import { useGlobalStore } from '@/hooks/use-global-provider';

const PhoneForm = () => {
  const setPhone = useGlobalStore((store) => store.setPhone);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ phone: string }>();

  const onSubmit: SubmitHandler<{ phone: string }> = (data) =>
    setPhone(data.phone);

  return (
    <form className='flex flex-col grow-1' onSubmit={handleSubmit(onSubmit)}>
      <div className='p-4 border-b-1 border-on-primary'>
        Введите номер телефона
      </div>
      <div className='grow-1 p-4 flex flex-col gap-4'>
        <div>
          <Input
            className='w-full'
            label='Номер телефона'
            {...register('phone', {
              required: 'Поле обязательно для заполнения',
              pattern: {
                value: /^7\d{10}$/,
                message: 'Введите номер в формате 7XXXXXXXXXX',
              },
            })}
            isError={Boolean(errors.phone?.message)}
            placeholder='7XXXXXXXXXX'
          />
          <span className='block h-[15px] text-red-500 text-xs'>
            {errors.phone?.message}
          </span>
        </div>
      </div>
      <div className='p-4 border-t-1 border-on-primary flex justify-end'>
        <Button type='submit'>Продолжить</Button>
      </div>
    </form>
  );
};

export default PhoneForm;
