import { defaultNS } from '@/i18n';
import type translation from '@/i18n/en/translation.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: {
      translation: typeof translation;
    };
  }
}
