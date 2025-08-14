import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function Welcome() {
  const { t } = useLanguage();

  return (
    <div className="min-h-96 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <div className="text-6xl mb-4">🛠️</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('welcome.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {t('welcome.subtitle')}
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {t('welcome.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12">
          <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-2xl mb-2">📝</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Text Tools</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-2xl mb-2">🧮</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Calculator</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-2xl mb-2">💰</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Finance</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-2xl mb-2">🎲</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Random</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-2xl mb-2">❤️</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Health</span>
          </div>
        </div>
      </div>
    </div>
  );
}