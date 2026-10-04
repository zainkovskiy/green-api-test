import { createContext } from 'react';
import type { GlobalStore } from '../stores/global-store';
import type { StoreApi } from 'zustand';

export const GlobalStoreContext = createContext<
  StoreApi<GlobalStore> | undefined
>(undefined);
