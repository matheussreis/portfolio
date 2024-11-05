'use client';

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/hooks/use-app';
import { RefId } from '@/types';
import { Button } from './Button';
import { MenuIcon } from 'lucide-react';

export default function Navbar() {
  const { scrollToSection, currentSection } = useAppContext();

  const items = [
    { label: 'Home', key: 'home' },
    { label: 'Experience', key: 'experience' },
    { label: 'Education', key: 'education' },
    { label: 'Projects', key: 'projects' },
  ];

  return (
    <header className="h-16 w-full sticky top-0 bg-background select-none">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold">MSR</span>
        </a>
        <nav className="hidden items-center gap-4 md:flex">
          {items.map((item) => (
            <Button
              key={item.key}
              variant="none"
              onClick={() => scrollToSection(item.key as RefId)}
              className={cn(
                'p-1',
                currentSection === item.key ? 'font-extrabold text-md' : ''
              )}
            >
              {item.label}
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Menu Title</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="md:hidden">
              <SheetTitle className="hidden">Menu Title Mobile</SheetTitle>
              <SheetDescription className="hidden">
                Menu Description Mobile
              </SheetDescription>
              <nav className="grid gap-4 px-4 py-6">
                {items.map((item) => (
                  <Button
                    key={item.key}
                    variant="none"
                    className={cn(
                      'justify-start p-0',
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
