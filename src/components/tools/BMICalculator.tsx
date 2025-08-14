import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export function BMICalculator() {
  const { t } = useLanguage();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // Convert cm to meters
    
    if (weightNum > 0 && heightNum > 0) {
      const result = weightNum / (heightNum * heightNum);
      setBmi(Math.round(result * 10) / 10);
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: t('bmi.underweight'), color: 'text-blue-600' };
    if (bmi < 25) return { category: t('bmi.normal'), color: 'text-green-600' };
    if (bmi < 30) return { category: t('bmi.overweight'), color: 'text-yellow-600' };
    return { category: t('bmi.obese'), color: 'text-red-600' };
  };

  const clear = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        {t('bmi.title')}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('bmi.weight')}
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="70"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('bmi.height')}
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="175"
          />
        </div>
        
        <div className="flex space-x-3 pt-4">
          <button
            onClick={calculateBMI}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            {t('common.calculate')}
          </button>
          <button
            onClick={clear}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            {t('common.clear')}
          </button>
        </div>
        
        {bmi && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('bmi.result')}: <span className="text-2xl">{bmi}</span>
            </p>
            <p className={`text-lg font-medium mt-2 ${getBMICategory(bmi).color}`}>
              {getBMICategory(bmi).category}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}