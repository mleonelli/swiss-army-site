import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';

// Language configuration - easily enable/disable languages here
export const LANGUAGE_CONFIG = {
  en: { enabled: true, translations: en, name: 'English', flag: '🇺🇸' },
  es: { enabled: true, translations: es, name: 'Español', flag: '🇪🇸' },
  fr: { enabled: true, translations: fr, name: 'Français', flag: '🇫🇷' },
  de: { enabled: true, translations: de, name: 'Deutsch', flag: '🇩🇪' },
} as const;

// Get only enabled languages
export const getEnabledLanguages = () => {
  return Object.entries(LANGUAGE_CONFIG)
    .filter(([_, config]) => config.enabled)
    .reduce((acc, [code, config]) => {
      acc[code as keyof typeof LANGUAGE_CONFIG] = config;
      return acc;
    }, {} as typeof LANGUAGE_CONFIG);
};

// Get available language codes
export const getAvailableLanguageCodes = () => {
  return Object.keys(getEnabledLanguages()) as Array<keyof typeof LANGUAGE_CONFIG>;
};

// Get translations for all enabled languages
export const getAllTranslations = () => {
  const enabledLanguages = getEnabledLanguages();
  return Object.entries(enabledLanguages).reduce((acc, [code, config]) => {
    acc[code as keyof typeof LANGUAGE_CONFIG] = config.translations;
    return acc;
  }, {} as Record<keyof typeof LANGUAGE_CONFIG, any>);
};