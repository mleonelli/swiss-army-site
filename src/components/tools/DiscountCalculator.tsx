import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export function DiscountCalculator() {
  const { t } = useLanguage();
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [savings, setSavings] = useState<number | null>(null);

  const calculate = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);
    
    if (price > 0 && discount >= 0 && discount <= 100) {
      const discountAmount = (price * discount) / 100;
      const final = price - discountAmount;
      setFinalPrice(Math.round(final * 100) / 100);
      setSavings(Math.round(discountAmount * 100) / 100);
    }
  };

  const clear = () => {
    setOriginalPrice('');
    setDiscountPercent('');
    setFinalPrice(null);
    setSavings(null);
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        {t('discount.title')}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('discount.originalPrice')} ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="100.00"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('discount.discountPercent')}
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="25"
          />
        </div>
        
        <div className="flex space-x-3 pt-4">
          <button
            onClick={calculate}
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
        
        {finalPrice !== null && savings !== null && (
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <p className="text-lg font-semibold text-green-800 dark:text-green-200">
                {t('discount.finalPrice')}: <span className="text-2xl">${finalPrice}</span>
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                {t('discount.savings')}: <span className="text-xl">${savings}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}