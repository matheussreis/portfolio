import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/DropdownMenu';
import { Button } from './ui/Button';
import { GlobeIcon, LucideFlag } from 'lucide-react';
import { locales } from '@/i18n';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitch() {
  const { t, i18n } = useTranslation('translation');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="focus-visible:ring-0">
          <GlobeIcon className="h-5 w-5" />
          <span className="sr-only">{t('system.languages.sr-title')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => i18n.changeLanguage(locale)}
            className="cursor-pointer p-2"
          >
            <LucideFlag className="h-4 w-4" />
            <span className="text-xs">
              {t(`system.languages.options.${locale}`)}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
