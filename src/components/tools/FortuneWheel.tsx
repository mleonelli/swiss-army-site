import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function FortuneWheel() {
  const { t } = useLanguage();
  const [choices, setChoices] = useState(['Option 1', 'Option 2', 'Option 3']);
  const [newChoice, setNewChoice] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const addChoice = () => {
    if (newChoice.trim() && choices.length < 12) {
      setChoices([...choices, newChoice.trim()]);
      setNewChoice('');
    }
  };

  const removeChoice = (index: number) => {
    if (choices.length > 2) {
      setChoices(choices.filter((_, i) => i !== index));
    }
  };

  const spin = () => {
    if (choices.length === 0) return;
    
    setIsSpinning(true);
    setResult(null);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * choices.length);
      setResult(choices[randomIndex]);
      setIsSpinning(false);
    }, 2000);
  };

  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500',
    'bg-teal-500', 'bg-cyan-500', 'bg-lime-500', 'bg-rose-500'
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        {t('wheel.title')}
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Wheel */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className={`w-64 h-64 rounded-full border-4 border-gray-300 dark:border-gray-600 overflow-hidden transition-transform duration-2000 ${isSpinning ? 'animate-spin' : ''}`}>
              {choices.map((choice, index) => {
                const angle = (360 / choices.length) * index;
                const colorClass = colors[index % colors.length];
                return (
                  <div
                    key={index}
                    className={`absolute w-full h-full ${colorClass} opacity-80`}
                    style={{
                      clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((angle + 360/choices.length - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle + 360/choices.length - 90) * Math.PI / 180)}%)`,
                    }}
                  >
                    <div 
                      className="absolute text-white text-xs font-bold transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${50 + 35 * Math.cos((angle + 360/(choices.length*2) - 90) * Math.PI / 180)}%`,
                        top: `${50 + 35 * Math.sin((angle + 360/(choices.length*2) - 90) * Math.PI / 180)}%`,
                        transform: `translate(-50%, -50%) rotate(${angle + 360/(choices.length*2)}deg)`,
                        maxWidth: '60px',
                        wordWrap: 'break-word',
                        textAlign: 'center'
                      }}
                    >
                      {choice.length > 8 ? choice.substring(0, 8) + '...' : choice}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Arrow */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-gray-800 dark:border-b-white z-10"></div>
          </div>
          
          <button
            onClick={spin}
            disabled={isSpinning || choices.length === 0}
            className="mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {isSpinning ? '🎯' : t('common.spin')}
          </button>
          
          {result && !isSpinning && (
            <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <p className="text-lg font-bold text-yellow-800 dark:text-yellow-200 text-center">
                🎉 {t('wheel.result')}: {result}
              </p>
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choices</h3>
          
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={newChoice}
              onChange={(e) => setNewChoice(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addChoice()}
              placeholder={t('wheel.enterChoice')}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={addChoice}
              disabled={!newChoice.trim() || choices.length >= 12}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {choices.map((choice, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${colors[index % colors.length]}`}></div>
                  <span className="text-gray-900 dark:text-white">{choice}</span>
                </div>
                {choices.length > 2 && (
                  <button
                    onClick={() => removeChoice(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}