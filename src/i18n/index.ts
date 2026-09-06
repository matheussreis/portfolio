import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from '@/i18n/en/translation.json';
import translationPt from '@/i18n/pt/translation.json';
import LanguageDetector from 'i18next-browser-languagedetector';
import I18NextLocalStorageBackend from 'i18next-localstorage-backend';

const defaultNS = 'translation';

const resources = {
  en: {
    translation: translationEn,
  },
  pt: {
    translation: translationPt,
  },
};

type Locale = keyof typeof resources;

const locales = Object.keys(resources) as Locale[];

const syncHtmlLang = (language: string) => {
  document.documentElement.lang = language;
};

const syncMetaTags = () => {
  document.title = i18n.t('system.meta.title');
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', i18n.t('system.meta.description'));
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      debug: false,
      resources: resources,
      fallbackLng: 'en',
      defaultNS,
      interpolation: {
        escapeValue: false,
      },
      backend: {
        backends: [I18NextLocalStorageBackend],
        backendOptions: [],
        cacheHitMode: 'refreshAndUpdateStore',
      },
      react: {
        bindI18nStore: 'added',
      },
    },
    () => {
      syncHtmlLang(i18n.language);
      syncMetaTags();
    },
  );

i18n.on('languageChanged', syncHtmlLang);
i18n.on('languageChanged', syncMetaTags);

export { i18n, defaultNS, type Locale, locales };
