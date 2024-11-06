import translation from '@/i18n/en/translation.json';

export type ThemeOptions = keyof typeof translation.system.themes.options;

export type I18nExperienceItemKey =
  keyof typeof translation.sections.experience.data;

export type I18nEducationItemKey =
  keyof typeof translation.sections.education.data;

export type I18nProjectItemKey =
  keyof typeof translation.sections.projects.data;

export type I18nNavbarItemKey = keyof typeof translation.layout.navbar.items;
