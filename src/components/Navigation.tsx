import React, { useState } from 'react';
import { Calculator, DollarSign, Shuffle, Heart, Type, Menu, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false); // Close mobile menu when tool is selected
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu Button */}
        <div className="flex items-center justify-between py-4 md:hidden">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            {activeCategory !== 'welcome' && categories.find(c => c.id === activeCategory)?.name}
          </span>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:block">
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
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg z-50 max-h-96 overflow-y-auto">
            <div className="px-4 py-4 space-y-4">
              {/* Categories */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Categories
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          handleCategoryClick(category.id);
                          if (subcategories[category.id].length === 0) {
                            setIsMobileMenuOpen(false);
                          }
                        }}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                          activeCategory === category.id
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        <span className="font-medium">{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Subcategories */}
              {activeCategory !== 'welcome' && subcategories[activeCategory] && subcategories[activeCategory].length > 0 && (
                <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {categories.find(c => c.id === activeCategory)?.name} Tools
                  </h3>
                  <div className="space-y-1">
                    {subcategories[activeCategory].map((subcategory) => (
                      <div key={subcategory.id} className="space-y-1">
                        <button
                          onClick={() => handleSubcategoryClick(subcategory.id)}
                          className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeSubcategory === subcategory.id
                              ? 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {subcategory.name}
                        </button>
                        
                        {/* Tools under subcategory */}
                        {activeSubcategory === subcategory.id && (
                          <div className="ml-4 space-y-1">
                            {subcategory.tools.map((tool) => (
                              <button
                                key={tool.id}
                                onClick={() => handleToolClick(tool.id)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                  activeTool === tool.id
                                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                    : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                              >
                                {tool.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}
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