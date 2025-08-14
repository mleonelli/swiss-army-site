import React, { useState } from 'react';
import { Calculator, DollarSign, Shuffle, Heart, Type } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export type Category = 'welcome' | 'text' | 'calculation' | 'financial' | 'randomizer' | 'health';

export interface Subcategory {
  id: string;
  name: string;
  tools: Tool[];
}

export interface Tool {
  id: string;
  name: string;
  component: string;
}

interface NavigationProps {
  activeCategory: Category;
  setActiveCategory: (category: Category) => void;
  activeSubcategory: string | null;
  setActiveSubcategory: (subcategory: string | null) => void;
  activeTool: string | null;
  setActiveTool: (tool: string | null) => void;
}

export function Navigation({ 
  activeCategory, 
  setActiveCategory, 
  activeSubcategory, 
  setActiveSubcategory,
  activeTool,
  setActiveTool 
}: NavigationProps) {
  const { t } = useLanguage();

  const subcategories: Record<Category, Subcategory[]> = {
    welcome: [],
    text: [
      {
        id: 'text-processing',
        name: t('nav.textProcessing'),
        tools: [
          { id: 'text-sorter', name: t('tools.textSorter'), component: 'TextSorter' }
        ]
      },
      {
        id: 'text-analysis',
        name: t('nav.textAnalysis'),
        tools: [
          { id: 'word-counter', name: t('tools.wordCounter'), component: 'WordCounter' }
        ]
      }
    ],
    calculation: [
      {
        id: 'basic-math',
        name: t('nav.basicMath'),
        tools: [
          { id: 'basic-calculator', name: t('tools.basicCalculator'), component: 'BasicCalculator' }
        ]
      },
      {
        id: 'unit-conversion',
        name: t('nav.unitConversion'),
        tools: [
          { id: 'temperature-converter', name: t('tools.temperatureConverter'), component: 'TemperatureConverter' }
        ]
      }
    ],
    financial: [
      {
        id: 'pricing',
        name: t('nav.pricing'),
        tools: [
          { id: 'discount-calculator', name: t('tools.discountCalculator'), component: 'DiscountCalculator' }
        ]
      },
      {
        id: 'investment',
        name: t('nav.investment'),
        tools: [
          { id: 'compound-interest', name: t('tools.compoundInterest'), component: 'CompoundInterestCalculator' }
        ]
      }
    ],
    randomizer: [
      {
        id: 'decision-making',
        name: t('nav.decisionMaking'),
        tools: [
          { id: 'fortune-wheel', name: t('tools.fortuneWheel'), component: 'FortuneWheel' }
        ]
      },
      {
        id: 'generators',
        name: t('nav.generators'),
        tools: [
          { id: 'password-generator', name: t('tools.passwordGenerator'), component: 'PasswordGenerator' }
        ]
      }
    ],
    health: [
      {
        id: 'body-metrics',
        name: t('nav.bodyMetrics'),
        tools: [
          { id: 'bmi-calculator', name: t('tools.bmiCalculator'), component: 'BMICalculator' }
        ]
      },
      {
        id: 'fitness',
        name: t('nav.fitness'),
        tools: [
          { id: 'calorie-calculator', name: t('tools.calorieCalculator'), component: 'CalorieCalculator' }
        ]
      }
    ]
  };
  const categories = [
    { id: 'text' as Category, name: t('nav.textTools'), icon: Type },
    { id: 'calculation' as Category, name: t('nav.calculationTools'), icon: Calculator },
    { id: 'financial' as Category, name: t('nav.financialTools'), icon: DollarSign },
    { id: 'randomizer' as Category, name: t('nav.randomizerTools'), icon: Shuffle },
    { id: 'health' as Category, name: t('nav.healthTools'), icon: Heart },
  ];

  const handleCategoryClick = (categoryId: Category) => {
    setActiveCategory(categoryId);
    setActiveSubcategory(null);
    setActiveTool(null);
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    setActiveSubcategory(subcategoryId);
    setActiveTool(null);
  };

  const handleToolClick = (toolId: string) => {
    setActiveTool(toolId);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Categories */}
        <div className="flex space-x-6 overflow-x-auto py-4 border-b border-gray-100 dark:border-gray-700">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-2 border-blue-200 dark:border-blue-700'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
        
        {/* Subcategories */}
        {activeCategory !== 'welcome' && subcategories[activeCategory] && (
          <div className="flex space-x-4 overflow-x-auto py-3">
            {subcategories[activeCategory].map((subcategory) => (
              <button
                key={subcategory.id}
                onClick={() => handleSubcategoryClick(subcategory.id)}
                className={`px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  activeSubcategory === subcategory.id
                    ? 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {subcategory.name}
              </button>
            ))}
          </div>
        )}
        
        {/* Tools */}
        {activeSubcategory && subcategories[activeCategory] && (
          <div className="flex space-x-3 overflow-x-auto py-2 pb-4">
            {subcategories[activeCategory]
              .find(sub => sub.id === activeSubcategory)
              ?.tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleToolClick(tool.id)}
                  className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    activeTool === tool.id
                      ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
                      : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {tool.name}
                </button>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
}