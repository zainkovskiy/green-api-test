import { useAuthorization } from '@/hooks/use-authorization';
import CredentialsFields from './credentials-fields/credentials-fields';
import QrCode from './qr-code/qr-code';
import Starting from './starting/starting';

const CredentialsForm = () => {
  const { qr, hasCredentials, isStateLoading, isQrLoading, state } =
    useAuthorization();

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
