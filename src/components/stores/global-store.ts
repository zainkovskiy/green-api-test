import type { Credentials } from '@/types/auth';
import { createStore } from 'zustand';

export type GlobalState = {
  idInstance: string | null;
  apiTokenInstance: string | null;
  phone: string | null;
  isAuthorized: boolean;
};

export type GlobalActions = {
  setCredentials: (credentials: Credentials) => void;
  setPhone: (phone: string) => void;
  setAuthorized: () => void;
  resetCredentials: () => void;
};

export type GlobalStore = GlobalState & GlobalActions;

export const createGlobalStore = () => {
  return createStore<GlobalStore>()((set) => ({
    idInstance: null,
    apiTokenInstance: null,
    phone: null,
    isAuthorized: false,
    setCredentials: (credentials) =>
      set({
        idInstance: credentials.idInstance,
        apiTokenInstance: credentials.apiTokenInstance,
      }),
    setPhone: (phone) => set({ phone: phone }),
    setAuthorized: () => set({ isAuthorized: true }),
    resetCredentials: () =>
      set({
        idInstance: null,
        apiTokenInstance: null,
        isAuthorized: false,
        phone: null,
      }),
  }));
};
