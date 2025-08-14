import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export function CompoundInterestCalculator() {
  const { t } = useLanguage();
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compound, setCompound] = useState('12'); // Monthly by default
  const [result, setResult] = useState<{
    finalAmount: number;
    totalInterest: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compound);
    
    if (p > 0 && r >= 0 && t > 0 && n > 0) {
      const finalAmount = p * Math.pow((1 + r/n), n * t);
      const totalInterest = finalAmount - p;
      
      setResult({
        finalAmount: Math.round(finalAmount * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100
      });
    }
  };

  const clear = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setCompound('12');
    setResult(null);
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Compound Interest Calculator
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Principal Amount ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="1000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="5"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Time Period (years)
          </label>
          <input
            type="number"
            step="0.1"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="10"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Compound Frequency
          </label>
          <select
            value={compound}
            onChange={(e) => setCompound(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="1">Annually</option>
            <option value="2">Semi-annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
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
        
        {result && (
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <p className="text-lg font-semibold text-green-800 dark:text-green-200">
                Final Amount: <span className="text-2xl">${result.finalAmount.toLocaleString()}</span>
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                Total Interest: <span className="text-xl">${result.totalInterest.toLocaleString()}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}