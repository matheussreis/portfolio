import './index.css';
import App from './App.tsx';
import { AppProvider } from './context';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
  </AppProvider>
);
