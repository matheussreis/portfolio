import translation from '@/i18n/en/translation.json';
import { I18nNavbarItemKey, I18nSkillItemKey, ThemeOptions } from '@/types';

export const themeOptions = Object.keys(
  translation.system.themes.options
) as ThemeOptions[];

export const skillKeys = Object.keys(
  translation.sections.skills.data
) as Array<I18nSkillItemKey>;

export const navbarItemKeys = Object.keys(
  translation.layout.navbar.items
) as Array<I18nNavbarItemKey>;
