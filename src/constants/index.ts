import translation from '@/i18n/en/translation.json';
import { ThemeOptions } from '@/types';

export const themeOptions = Object.keys(
  translation.system.themes.options
) as ThemeOptions[];
