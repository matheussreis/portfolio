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


export type ScrollContextType = {
  scrollToSection: (elementId: RefId) => void;
  refs: Record<RefId, RefObject<HTMLElement>>;
  currentSection: RefId;
};


const ScrollContext = createContext<ScrollContextType | undefined>(undefined);


interface ScrollProviderProps {
  children: React.ReactNode;
}

export function ScrollProvider({ children }: ScrollProviderProps) {
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
      if (elementId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (ref?.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
      }
      setCurrentSection(elementId);
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
    <ScrollContext.Provider
      value={{
        scrollToSection,
        refs: refMapping,
        currentSection,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}


export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context)
    throw new Error('useScrollContext must be used within ScrollProvider');
  return context;
};
