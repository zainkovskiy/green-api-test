import Button from '@/components/ui/button/button';

interface ErrorState {
  text: string;
  onClick: () => void;
}

const ErrorState = ({ text, onClick }: ErrorState) => {
  return (
    <div className='flex flex-col p-4 justify-center items-center w-full gap-4'>
      <span>{text}</span>
      <Button onClick={onClick}>Повторить</Button>
    </div>
  );
};

export default ErrorState;
