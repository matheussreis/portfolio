import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/Sheet';
import { cn } from '@/lib/utils';
import { Button } from './ui/Button';
import { MenuIcon } from 'lucide-react';
import ThemeSwitch from './ThemeSwitch';
import { RefId, useAppContext } from '@/context';
import LanguageSwitch from '@/components/LanguageSwitch';
import { navbarItemKeys } from '@/constants';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { scrollToSection, currentSection } = useAppContext();
  const { t } = useTranslation();

  const items = navbarItemKeys.map((item) => ({
    label: t(`layout.navbar.items.${item}`),
    key: `${item}`,
  }));

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
        <nav className="hidden items-center gap-4 md:flex">
          {items.map((item) => (
            <Button
              key={item.key}
              type="button"
              variant="none"
              onClick={() => scrollToSection(item.key as RefId)}
              className={cn(
                'p-1',
                currentSection === item.key ? 'font-extrabold text-md' : '',
                'transition-all duration-800'
              )}
            >
              {item.label}
            </Button>
          ))}
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
                  <Button
                    key={item.key}
                    variant="none"
                    className={cn(
                      'justify-start p-0',
                      'transition-all duration-800',
                      currentSection === item.key
                        ? 'font-extrabold text-md'
                        : ''
                    )}
                    onClick={() => scrollToSection(item.key as RefId)}
                  >
                    {item.label}
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
