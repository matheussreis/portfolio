import translation from '@/i18n/en/translation.json';

export type ThemeOptions = keyof typeof translation.system.themes.options;

export type I18nEducationItem = {
  name: string;
  startDate: string;
  endDate: string;
  organisation: string;
};

export type I18nProjectItem = {
  name: string;
  description: string;
  type: { name: string; style: 'default' | 'outline' };
  href?: string;
  technologies: string[];
};

export type I18nExperienceItem = {
  company: string;
  location: string;
  roles: I18nExperienceSubitem[];
};

export type I18nExperienceSubitem = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  contract: string;
  skills: string[];
};

export type I18nSkillItemKey = keyof typeof translation.sections.skills.data;

export type I18nSkillTypeKey = keyof typeof translation.sections.skills.types;

export type I18nNavbarItemKey = keyof typeof translation.layout.navbar.items;
