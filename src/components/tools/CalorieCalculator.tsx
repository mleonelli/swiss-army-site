import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export function CalorieCalculator() {
  const { t } = useLanguage();
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('1.2');
  const [result, setResult] = useState<{
    bmr: number;
    maintenance: number;
    weightLoss: number;
    weightGain: number;
  } | null>(null);

  const calculate = () => {
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const activityNum = parseFloat(activity);
    
    if (ageNum > 0 && weightNum > 0 && heightNum > 0) {
      let bmr;
      
      // Mifflin-St Jeor Equation
      if (gender === 'male') {
        bmr = (10 * weightNum) + (6.25 * heightNum) - (5 * ageNum) + 5;
      } else {
        bmr = (10 * weightNum) + (6.25 * heightNum) - (5 * ageNum) - 161;
      }
      
      const maintenance = bmr * activityNum;
      const weightLoss = maintenance - 500; // 500 calorie deficit
      const weightGain = maintenance + 500; // 500 calorie surplus
      
      setResult({
        bmr: Math.round(bmr),
        maintenance: Math.round(maintenance),
        weightLoss: Math.round(weightLoss),
        weightGain: Math.round(weightGain)
      });
    }
  };

  const clear = () => {
    setAge('');
    setWeight('');
    setHeight('');
    setActivity('1.2');
    setResult(null);
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Calorie Calculator
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Age (years)
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="25"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Weight (kg)
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
            Height (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="175"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Activity Level
          </label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="1.2">Sedentary (little/no exercise)</option>
            <option value="1.375">Light activity (light exercise 1-3 days/week)</option>
            <option value="1.55">Moderate activity (moderate exercise 3-5 days/week)</option>
            <option value="1.725">Very active (hard exercise 6-7 days/week)</option>
            <option value="1.9">Extremely active (very hard exercise, physical job)</option>
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
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                BMR: <span className="text-lg text-gray-900 dark:text-white">{result.bmr} cal/day</span>
              </p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                Maintenance: <span className="text-lg">{result.maintenance} cal/day</span>
              </p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900 rounded-lg">
              <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                Weight Loss: <span className="text-lg">{result.weightLoss} cal/day</span>
              </p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
              <p className="text-sm font-semibold text-green-700 dark:text-green-300">
                Weight Gain: <span className="text-lg">{result.weightGain} cal/day</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}