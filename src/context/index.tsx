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

export type RefId = 'home' | 'experience' | 'education' | 'projects';

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

  const refMapping = useMemo(
    () => ({
      projects: projectsRef,
      home: homeRef,
      experience: experienceRef,
      education: educationRef,
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
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const visibleSection = entry.target.getAttribute(
            'data-section'
          ) as RefId;
          if (visibleSection) {
            setCurrentSection(visibleSection);
          }
        }
      });
    };

    const threshold = window.innerWidth < 768 ? 0.4 : 0.6;
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: threshold,
    });

    Object.keys(refMapping).forEach((key) => {
      const ref = refMapping[key as RefId];
      if (ref.current) {
        ref.current.setAttribute('data-section', key);
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(refMapping).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [refMapping]);

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
