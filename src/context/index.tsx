import {
  RefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
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
  const isManualScroll = useRef(false);

  const projectsRef = useRef<HTMLElement>(null);
  const homeRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();

  const refMapping = {
    projects: projectsRef,
    home: homeRef,
    experience: experienceRef,
    education: educationRef,
    skills: skillsRef,
  };

  const scrollToSection = useCallback(
    (elementId: RefId) => {
      const ref = refMapping[elementId];
      isManualScroll.current = true;
      setCurrentSection(elementId);

      if (elementId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (ref?.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
      }

      setTimeout(() => {
        isManualScroll.current = false;
      }, 1000);
    },
    [refMapping],
  );

  useEffect(() => {
    const unsubscribe = scrollY.on('change', () => {
      if (isManualScroll.current) {
        return;
      }

      const navbar = document.querySelector('nav');
      const navbarHeight = navbar?.clientHeight || 0;
      const viewportCenter = navbarHeight + window.innerHeight / 2;

      let nearestSection: RefId | null = null;
      let minDistance = Number.MAX_VALUE;

      for (const [key, ref] of Object.entries(refMapping)) {
        if (!ref.current) {
          continue;
        }

        const rect = ref.current.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          nearestSection = key as RefId;
        }
      }

      if (nearestSection) {
        setCurrentSection(nearestSection);
      }
    });

    return () => unsubscribe();
  }, [scrollY, refMapping]);

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
