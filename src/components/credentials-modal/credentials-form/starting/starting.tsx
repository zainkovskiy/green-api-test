import Loader from '@/components/ui/loader/loader';

const Starting = () => {
  return (
    <div className='p-4 flex justify-center items-center grow-1'>
      <div className='flex flex-col gap-4'>
        <span>Запуск инстанса...</span>
        <div className='flex items-center justify-center grow-1'>
          <Loader />
        </div>
      </div>
    </div>
  );
};

export default Starting;
