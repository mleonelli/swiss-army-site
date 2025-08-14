import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGE_CONFIG, getEnabledLanguages, getAvailableLanguageCodes, getAllTranslations } from '../locales';

export type Language = keyof typeof LANGUAGE_CONFIG;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  availableLanguages: typeof LANGUAGE_CONFIG;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const availableLanguageCodes = getAvailableLanguageCodes();
  const [language, setLanguage] = useState<Language>(availableLanguageCodes[0] || 'en');
  
  const translations = getAllTranslations();
  const availableLanguages = getEnabledLanguages();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && availableLanguageCodes.includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}