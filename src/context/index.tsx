import {
  RefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useScroll } from 'framer-motion';

export type RefId = 'home' | 'experience' | 'education' | 'projects' | 'skills';

export type AppContextType = {
  scrollToSection: (elementId: RefId) => void;
  refs: Record<RefId, RefObject<HTMLElement>>;
  currentSection: RefId;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [currentSection, setCurrentSection] = useState<RefId>('home');

  const projectsRef = useRef<HTMLElement>(null);
  const homeRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const skillRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();

  const refMapping = useMemo(
    () => ({
      projects: projectsRef,
      home: homeRef,
      experience: experienceRef,
      education: educationRef,
      skills: skillRef,
    }),
    []
  );

  const scrollToSection = useCallback(
    (elementId: RefId) => {
      const ref = refMapping[elementId];
      if (ref?.current) {
        setCurrentSection(elementId);
        ref.current.scrollIntoView({
          behavior: 'smooth',
        });
      }
    },
    [refMapping]
  );

  useEffect(() => {
    scrollY.on('change', () => {
      let nearestSection: RefId | null = null;
      let minDistance = Number.MAX_VALUE;

      for (const key in refMapping) {
        const ref = refMapping[key as RefId];

        if (!ref.current) {
          continue;
        }

        const rect = ref.current.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        if (distance < minDistance) {
          minDistance = distance;
          nearestSection = key as RefId;
        }
      }

      if (nearestSection && nearestSection !== currentSection) {
        setCurrentSection(nearestSection);
      }
    });
  }, [scrollY, refMapping, currentSection]);

  return (
    <AppContext.Provider
      value={{
        scrollToSection,
        refs: refMapping,
        currentSection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error('useAppContext must be used within AppProvider');
  return context;
};
