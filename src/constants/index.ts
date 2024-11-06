import translation from '@/i18n/en/translation.json';
import {
  I18nEducationItemKey,
  I18nExperienceItemKey,
  I18nNavbarItemKey,
  I18nProjectItemKey,
  ThemeOptions,
} from '@/types';

export const themeOptions = Object.keys(
  translation.system.themes.options
) as ThemeOptions[];

export const educationKeys = Object.keys(
  translation.sections.education.data
) as Array<I18nEducationItemKey>;

export const projectKeys = Object.keys(
  translation.sections.projects.data
) as Array<I18nProjectItemKey>;

export const navbarItemKeys = Object.keys(
  translation.layout.navbar.items
) as Array<I18nNavbarItemKey>;

export const experienceKeys = Object.keys(
  translation.sections.experience.data
) as Array<I18nExperienceItemKey>;

export const experienceSkillMapping = Object.fromEntries(
  Object.entries(translation.sections.experience.data).map(([key, item]) => [
    key as I18nExperienceItemKey,
    Object.keys(item.skills || {}),
  ])
) as Record<I18nExperienceItemKey, Array<string>>;

export const projectTechnologyMapping = Object.fromEntries(
  Object.entries(translation.sections.projects.data).map(([key, item]) => [
    key as I18nProjectItemKey,
    Object.keys(item.technologies || {}),
  ])
) as Record<I18nProjectItemKey, Array<string>>;
