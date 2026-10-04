import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { GlobalStoreProvider } from './components/provider/global-provider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <GlobalStoreProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </GlobalStoreProvider>,
);
