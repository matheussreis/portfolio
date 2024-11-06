import './index.css';
import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './context/index.tsx';
import { defaultNS, i18n } from '@/i18n/index.ts';
import { ThemeProvider } from './components/ThemeProvider.tsx';
import { I18nextProvider } from 'react-i18next';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <I18nextProvider i18n={i18n} defaultNS={defaultNS}>
      <AppProvider>
        <App />
      </AppProvider>
    </I18nextProvider>
  </ThemeProvider>
);
