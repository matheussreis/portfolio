import { RefObject } from 'react';

export type RefId = 'home' | 'experience' | 'education' | 'projects';

export type AppContextType = {
  scrollToSection: (elementId: RefId) => void;
  refs: Record<RefId, RefObject<HTMLElement>>;
  currentSection: RefId;
};
