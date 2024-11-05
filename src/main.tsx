import './index.css';
import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './context/index.tsx';

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
  </AppProvider>
);
