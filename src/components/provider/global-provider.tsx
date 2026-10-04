import { useState, type ReactNode } from 'react';
import { createGlobalStore } from '../stores/global-store';
import { GlobalStoreContext } from './global-store-context';

export interface GlobalStoreProviderProps {
  children: ReactNode;
}

export const GlobalStoreProvider = ({ children }: GlobalStoreProviderProps) => {
  const [store] = useState(() => createGlobalStore());

  return (
    <GlobalStoreContext.Provider value={store}>
      {children}
    </GlobalStoreContext.Provider>
  );
};
