import translation from '@/i18n/en/translation.json';

export type ThemeOptions = keyof typeof translation.system.themes.options;

export type I18nExperienceItemKey =
  keyof typeof translation.sections.experience.data;

export type I18nEducationItem = {
  name: string;
  startDate: string;
  endDate: string;
  organisation: string;
};

export type I18nProjectItemKey =
  keyof typeof translation.sections.projects.data;

export type I18nSkillItemKey = keyof typeof translation.sections.skills.data;

export type I18nSkillTypeKey = keyof typeof translation.sections.skills.types;

export type I18nNavbarItemKey = keyof typeof translation.layout.navbar.items;

export type I18nRoleSkillMapping = {
  [RoleKey in keyof (typeof translation.sections.experience.data)[keyof typeof translation.sections.experience.data]['roles']]: Array<
    keyof (typeof translation.sections.experience.data)[keyof typeof translation.sections.experience.data]['roles'][RoleKey]['skills']
  >;
};

export type I18nCompanyRoleMapping = {
  [CompanyKey in keyof typeof translation.sections.experience.data]: Array<
    keyof (typeof translation.sections.experience.data)[CompanyKey]['roles']
  >;
};
