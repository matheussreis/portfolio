import { createContext } from 'react';
import { AppContextType } from '@/types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export default AppContext;
