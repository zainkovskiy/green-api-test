import type { Credentials } from '@/types/auth';
import { buildUrl } from '@/utils/url';

const AUTH_ACTIONS = {
  GET_STATE_INSTANCE: 'getStateInstance',
  QR: 'qr',
} as const;

export const getInstanceState = async ({
  idInstance,
  apiTokenInstance,
}: Credentials): Promise<{ stateInstance: string }> => {
  const response = await fetch(
    buildUrl(idInstance, apiTokenInstance, AUTH_ACTIONS.GET_STATE_INSTANCE),
  );

  if (!response.ok) {
    throw new Error(`error: ${response.status}`);
  }

  return response.json();
};

export const getQrCode = async ({
  idInstance,
  apiTokenInstance,
}: Credentials): Promise<{ message: string }> => {
  const response = await fetch(
    buildUrl(idInstance, apiTokenInstance, AUTH_ACTIONS.QR),
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`error: ${response.status}`);
  }

  if (data?.type === 'error') {
    throw new Error(data.message);
  }

  return data;
};
