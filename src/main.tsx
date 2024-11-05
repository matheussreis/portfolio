import './index.css';
import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './context/index.tsx';
import { ThemeProvider } from './components/ThemeProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <AppProvider>
      <App />
    </AppProvider>
  </ThemeProvider>
);
