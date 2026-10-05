import { useAuthorization } from '@/hooks/use-authorization';
import CredentialsFields from './credentials-fields/credentials-fields';
import QrCode from './qr-code/qr-code';
import Starting from './starting/starting';
import { useGlobalStore } from '@/hooks/use-global-provider';
import ErrorState from './error-state/error-state';

const CredentialsForm = () => {
  const {
    qr,
    hasCredentials,
    isStateLoading,
    isQrLoading,
    state,
    isErrorState,
    isErrorQr,
    refetchQr,
  } = useAuthorization();
  const resetCredentials = useGlobalStore((store) => store.resetCredentials);

  if (isErrorState) {
    return <ErrorState text='Ошибка авторизации' onClick={resetCredentials} />;
  }

  if (isErrorQr) {
    return (
      <ErrorState
        text='Не удалось получить QR-код'
        onClick={() => refetchQr()}
      />
    );
  }

  if (
    !hasCredentials ||
    isStateLoading ||
    (state === 'notAuthorized' && isQrLoading)
  ) {
    return <CredentialsFields isStateLoading={isStateLoading || isQrLoading} />;
  }

  if (state === 'starting') {
    return <Starting />;
  }

  if (state === 'notAuthorized' && qr) {
    return <QrCode qr={qr} />;
  }

  return null;
};

export default CredentialsForm;
