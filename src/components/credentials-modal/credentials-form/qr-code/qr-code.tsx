interface QrCodeProps {
  qr: string;
}

const QrCode = ({ qr }: QrCodeProps) => {
  return (
    <div className='grow-1 p-4 flex flex-col items-center justify-center gap-2'>
      <img
        src={`data:image/png;base64,${qr}`}
        className='w-[300px] h-[300px]'
      />
      <span className='font-medium'>Войдите по QR-коду</span>
      <span className='text-gray-600 text-xs text-center'>
        Отсканируйте QR-код в WhatsApp, чтобы подключить аккаунт.
      </span>
    </div>
  );
};

export default QrCode;
