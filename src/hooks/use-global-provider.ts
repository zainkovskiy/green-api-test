import { useContext } from 'react';
import type { GlobalStore } from '../components/stores/global-store';
import { useStore } from 'zustand';
import { GlobalStoreContext } from '../components/provider/global-store-context';

export function useGlobalStore<T>(selector: (store: GlobalStore) => T) {
  const store = useContext(GlobalStoreContext);
  if (!store)
    throw new Error('useGlobalStore must be used within <GlobalStoreProvider>');
  return useStore(store, selector);
}
