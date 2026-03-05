import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/Sheet';
import { cn } from '@/lib/utils';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { MenuIcon } from 'lucide-react';
import ThemeSwitch from './ThemeSwitch';
import { navbarItemKeys } from '@/constants';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import { RefId, useScrollContext } from '@/context';
import LanguageSwitch from '@/components/LanguageSwitch';

export default function Navbar() {
  const { scrollToSection, currentSection } = useScrollContext();
  const { t } = useTranslation();
  const navRef = useRef<HTMLDivElement>(null);
  const [underlineX, setUnderlineX] = useState(0);
  const [underlineWidth, setUnderlineWidth] = useState(0);

  const items = navbarItemKeys.map((item) => ({
    label: t(`layout.navbar.items.${item}`),
    key: `${item}`,
  }));

  useEffect(() => {
    if (!navRef.current) {
      return;
    }

    const activeButton = navRef.current.querySelector(
      `button[data-section="${currentSection}"]`,
    ) as HTMLElement;

    if (activeButton) {
      setUnderlineX(activeButton.offsetLeft);
      setUnderlineWidth(activeButton.offsetWidth);
    }
  }, [currentSection]);

  return (
    <header className="h-16 w-full sticky top-0 bg-background select-none">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Button
          type="button"
          variant="none"
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-2 p-0 m-0"
        >
          <span className="text-xl font-semibold">
            {t('system.settings.siteName')}
          </span>
        </Button>
        <nav
          ref={navRef}
          className="hidden items-center gap-4 md:flex relative"
        >
          {items.map((item) => (
            <motion.button
              key={item.key}
              data-section={item.key}
              onClick={() => scrollToSection(item.key as RefId)}
              className={cn(
                'p-1 relative z-10',
                'transition-all duration-300',
                currentSection === item.key ? 'font-bold text-md' : '',
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.button>
          ))}
          <motion.div
            className="absolute bottom-0 h-0.5 bg-foreground rounded-full"
            animate={{
              x: underlineX,
              width: underlineWidth,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          />
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitch />
          <ThemeSwitch />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">
                  {t('layout.navbar.sr-menu-title')}
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="md:hidden">
              <SheetTitle className="hidden">
                {t('layout.navbar.mobile.title')}
              </SheetTitle>
              <SheetDescription className="hidden">
                {t('layout.navbar.mobile.description')}
              </SheetDescription>
              <nav className="grid gap-4 px-4 py-6">
                {items.map((item) => (
                  <motion.button
                    key={item.key}
                    onClick={() => scrollToSection(item.key as RefId)}
                    className={cn(
                      'justify-start p-0 w-full text-left',
                      'transition-all duration-300',
                      currentSection === item.key
                        ? 'font-extrabold text-md'
                        : '',
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
