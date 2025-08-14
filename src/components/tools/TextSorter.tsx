import React, { useState } from 'react';
import { ArrowUpDown, ArrowUpWideNarrow } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function TextSorter() {
  const { t } = useLanguage();
  const [inputText, setInputText] = useState('');
  const [sortedText, setSortedText] = useState('');

  const sortAlphabetically = () => {
    const lines = inputText.split('\n').filter(line => line.trim() !== '');
    const sorted = lines.sort((a, b) => a.localeCompare(b));
    setSortedText(sorted.join('\n'));
  };

  const sortByLength = () => {
    const lines = inputText.split('\n').filter(line => line.trim() !== '');
    const sorted = lines.sort((a, b) => a.length - b.length);
    setSortedText(sorted.join('\n'));
  };

  const clear = () => {
    setInputText('');
    setSortedText('');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        {t('sorter.title')}
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Text
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t('sorter.placeholder')}
            className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
          />
          
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={sortAlphabetically}
              disabled={!inputText.trim()}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <ArrowUpDown className="h-4 w-4" />
              <span>{t('sorter.alphabetical')}</span>
            </button>
            
            <button
              onClick={sortByLength}
              disabled={!inputText.trim()}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <ArrowUpWideNarrow className="h-4 w-4" />
              <span>{t('sorter.byLength')}</span>
            </button>
            
            <button
              onClick={clear}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {t('common.clear')}
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sorted Result
          </label>
          <textarea
            value={sortedText}
            readOnly
            className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white resize-none bg-gray-50"
            placeholder="Sorted text will appear here..."
          />
          
          {sortedText && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>{sortedText.split('\n').length}</strong> lines sorted
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}