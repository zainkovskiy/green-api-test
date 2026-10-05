import { useQuery } from '@tanstack/react-query';
import { useGlobalStore } from './use-global-provider';
import { useEffect } from 'react';
import { getInstanceState, getQrCode } from '@/actions/auth';

export const useAuthorization = () => {
  const { idInstance, apiTokenInstance, setAuthorized } = useGlobalStore(
    (store) => store,
  );

  const hasCredentials = !!idInstance && !!apiTokenInstance;

  const stateQuery = useQuery({
    queryKey: ['instance-state', idInstance],
    queryFn: () =>
      getInstanceState({
        idInstance: idInstance!,
        apiTokenInstance: apiTokenInstance!,
      }),
    enabled: hasCredentials,
    refetchInterval: (query) => {
      const state = query.state.data?.stateInstance;

      if (state === 'authorized') {
        return false;
      }

      if (state === 'notAuthorized' || state === 'starting') {
        return 5000;
      }

      return false;
    },
  });

  useEffect(() => {
    const isAuthorized = stateQuery.data?.stateInstance === 'authorized';
    if (isAuthorized) {
      setAuthorized();
    }
  }, [stateQuery.data?.stateInstance, setAuthorized]);

  const qrQuery = useQuery({
    queryKey: ['qr', idInstance],
    queryFn: () =>
      getQrCode({
        idInstance: idInstance!,
        apiTokenInstance: apiTokenInstance!,
      }),
    enabled:
      hasCredentials && stateQuery.data?.stateInstance === 'notAuthorized',
    refetchInterval: 20000,
  });

  return {
    state: stateQuery.data?.stateInstance,
    qr: qrQuery.data?.message,
    hasCredentials,
    isStateLoading: stateQuery.isLoading,
    isQrLoading: qrQuery.isLoading,
    isErrorState: stateQuery.isError,
    isErrorQr: qrQuery.isError,
    refetchQr: qrQuery.refetch,
  };
};
