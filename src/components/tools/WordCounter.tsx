import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export function WordCounter() {
  const { t } = useLanguage();
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split('\n').length;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;

    return {
      characters,
      charactersNoSpaces,
      words,
      lines,
      paragraphs
    };
  }, [text]);

  const clear = () => {
    setText('');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Word Counter
      </h2>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter your text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
          />
          
          <button
            onClick={clear}
            className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            {t('common.clear')}
          </button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Statistics</h3>
          
          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {stats.characters.toLocaleString()}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Characters</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {stats.charactersNoSpaces.toLocaleString()}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">Characters (no spaces)</div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {stats.words.toLocaleString()}
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400">Words</div>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                {stats.lines.toLocaleString()}
              </div>
              <div className="text-sm text-orange-600 dark:text-orange-400">Lines</div>
            </div>
            
            <div className="bg-pink-50 dark:bg-pink-900 p-4 rounded-lg">
              <div className="text-2xl font-bold text-pink-700 dark:text-pink-300">
                {stats.paragraphs.toLocaleString()}
              </div>
              <div className="text-sm text-pink-600 dark:text-pink-400">Paragraphs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}