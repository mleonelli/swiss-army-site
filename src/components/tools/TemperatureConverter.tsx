import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export function TemperatureConverter() {
  const { t } = useLanguage();
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [kelvin, setKelvin] = useState('');

  const convertFromCelsius = (value: string) => {
    setCelsius(value);
    if (value === '') {
      setFahrenheit('');
      setKelvin('');
      return;
    }
    
    const c = parseFloat(value);
    if (!isNaN(c)) {
      setFahrenheit(((c * 9/5) + 32).toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    }
  };

  const convertFromFahrenheit = (value: string) => {
    setFahrenheit(value);
    if (value === '') {
      setCelsius('');
      setKelvin('');
      return;
    }
    
    const f = parseFloat(value);
    if (!isNaN(f)) {
      const c = (f - 32) * 5/9;
      setCelsius(c.toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    }
  };

  const convertFromKelvin = (value: string) => {
    setKelvin(value);
    if (value === '') {
      setCelsius('');
      setFahrenheit('');
      return;
    }
    
    const k = parseFloat(value);
    if (!isNaN(k)) {
      const c = k - 273.15;
      setCelsius(c.toFixed(2));
      setFahrenheit(((c * 9/5) + 32).toFixed(2));
    }
  };

  const clear = () => {
    setCelsius('');
    setFahrenheit('');
    setKelvin('');
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Temperature Converter
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Celsius (°C)
          </label>
          <input
            type="number"
            value={celsius}
            onChange={(e) => convertFromCelsius(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Fahrenheit (°F)
          </label>
          <input
            type="number"
            value={fahrenheit}
            onChange={(e) => convertFromFahrenheit(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="32"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kelvin (K)
          </label>
          <input
            type="number"
            value={kelvin}
            onChange={(e) => convertFromKelvin(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="273.15"
          />
        </div>
        
        <button
          onClick={clear}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors mt-6"
        >
          {t('common.clear')}
        </button>
        
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Quick Reference</h3>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <div>Water freezes: 0°C = 32°F = 273.15K</div>
            <div>Water boils: 100°C = 212°F = 373.15K</div>
            <div>Room temperature: ~20°C = ~68°F = ~293K</div>
          </div>
        </div>
      </div>
    </div>
  );
}