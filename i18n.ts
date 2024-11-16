import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationFr from './locales/fr/translations.json';

const resources = {
  fr: { translation: translationFr },
};

const initI18n = async () => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
