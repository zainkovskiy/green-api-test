const Loader = () => {
  return (
    <div className='flex gap-2' role='status' aria-label='Loading'>
      <span
        className='size-3 animate-ping rounded-full bg-on-primary'
        aria-hidden='true'
      ></span>
      <span
        className='size-3 animate-ping rounded-full bg-on-primary [animation-delay:0.2s]'
        aria-hidden='true'
      ></span>
      <span
        className='size-3 animate-ping rounded-full bg-on-primary [animation-delay:0.4s]'
        aria-hidden='true'
      ></span>
    </div>
  );
};

export default Loader;
