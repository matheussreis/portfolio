import translation from '@/i18n/en/translation.json';
import {
  I18nCompanyRoleMapping,
  I18nExperienceItemKey,
  I18nNavbarItemKey,
  I18nProjectItemKey,
  I18nRoleSkillMapping,
  I18nSkillItemKey,
  ThemeOptions,
} from '@/types';

export const themeOptions = Object.keys(
  translation.system.themes.options
) as ThemeOptions[];

export const projectKeys = Object.keys(
  translation.sections.projects.data
) as Array<I18nProjectItemKey>;

export const skillKeys = Object.keys(
  translation.sections.skills.data
) as Array<I18nSkillItemKey>;

export const navbarItemKeys = Object.keys(
  translation.layout.navbar.items
) as Array<I18nNavbarItemKey>;

export const companyKeys = Object.keys(
  translation.sections.experience.data
) as Array<I18nExperienceItemKey>;

export const roleSkillMapping = Object.fromEntries(
  Object.values(translation.sections.experience.data).flatMap((data) =>
    Object.entries(data.roles).map(([key, value]) => [
      key,
      Object.keys(value.skills),
    ])
  )
) as I18nRoleSkillMapping;

export const companyRoleMapping = Object.fromEntries(
  Object.entries(translation.sections.experience.data).map(
    ([companyKey, companyData]) => [
      companyKey as I18nExperienceItemKey,
      Object.keys(companyData.roles),
    ]
  )
) as I18nCompanyRoleMapping;

export const projectTechnologyMapping = Object.fromEntries(
  Object.entries(translation.sections.projects.data).map(([key, item]) => [
    key as I18nProjectItemKey,
    Object.keys(item.technologies || {}),
  ])
) as Record<I18nProjectItemKey, Array<string>>;
