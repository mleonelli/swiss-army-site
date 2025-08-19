import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  activeCategory: string;
  activeSubcategory: string;
  activeTool: string;
  setActiveCategory: (category: string) => void;
  setActiveSubcategory: (subcategory: string) => void;
  setActiveTool: (tool: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  activeCategory,
  activeSubcategory,
  activeTool,
  setActiveCategory,
  setActiveSubcategory,
  setActiveTool,
}) => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([activeCategory]);

  const categories = {
    calculators: {
      name: t('nav.calculationTools'),
      subcategories: {
        basic: {
          name: t('nav.basicMath'),
          tools: ['basicCalculator', 'bmiCalculator', 'calorieCalculator']
        },
        financial: {
          name: t('nav.pricing'),
          tools: ['discountCalculator', 'compoundInterest']
        }
      }
    },
    converters: {
      name: t('nav.calculationTools'),
      subcategories: {
        units: {
          name: t('nav.unitConversion'),
          tools: ['temperatureConverter']
        }
      }
    },
    generators: {
      name: t('nav.randomizerTools'),
      subcategories: {
        random: {
          name: t('nav.generators'),
          tools: ['passwordGenerator', 'fortuneWheel']
        }
      }
    },
    text: {
      name: t('nav.textTools'),
      subcategories: {
        processing: {
          name: t('nav.textProcessing'),
          tools: ['wordCounter', 'textSorter']
        }
      }
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleToolSelect = (category: string, subcategory: string, tool: string) => {
    setActiveCategory(category);
    setActiveSubcategory(subcategory);
    setActiveTool(tool);
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Desktop Navigation */}
      <nav className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
        <div className="p-4">
          
          {Object.entries(categories).map(([categoryKey, category]) => (
            <div key={categoryKey} className="mb-4">
              <button
                onClick={() => toggleCategory(categoryKey)}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                  activeCategory === categoryKey
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="font-medium">{category.name}</span>
                {expandedCategories.includes(categoryKey) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              
              {expandedCategories.includes(categoryKey) && (
                <div className="ml-4 mt-2 space-y-1">
                  {Object.entries(category.subcategories).map(([subcategoryKey, subcategory]) => (
                    <div key={subcategoryKey}>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 px-2 py-1">
                        {subcategory.name}
                      </div>
                      {subcategory.tools.map((tool) => (
                        <button
                          key={tool}
                          onClick={() => handleToolSelect(categoryKey, subcategoryKey, tool)}
                          className={`w-full text-left px-4 py-2 text-sm rounded transition-colors ${
                            activeTool === tool
                              ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-l-2 border-blue-500'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {t(`tools.${tool}`)}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className={`md:hidden fixed top-0 left-0 w-80 max-w-[85vw] h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } overflow-y-auto`}>
        <div className="p-4 pt-16">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
            {t('navigation.tools')}
          </h2>
          
          {Object.entries(categories).map(([categoryKey, category]) => (
            <div key={categoryKey} className="mb-6">
              <button
                onClick={() => toggleCategory(categoryKey)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  activeCategory === categoryKey
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="font-semibold text-lg">{category.name}</span>
                {expandedCategories.includes(categoryKey) ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>
              
              {expandedCategories.includes(categoryKey) && (
                <div className="mt-3 space-y-3">
                  {Object.entries(category.subcategories).map(([subcategoryKey, subcategory]) => (
                    <div key={subcategoryKey} className="ml-4">
                      <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 px-2 py-2 uppercase tracking-wide">
                        {subcategory.name}
                      </h4>
                      <div className="space-y-1">
                        {subcategory.tools.map((tool) => (
                          <button
                            key={tool}
                            onClick={() => handleToolSelect(categoryKey, subcategoryKey, tool)}
                            className={`w-full text-left px-4 py-3 text-base rounded-lg transition-colors min-h-[44px] flex items-center ${
                              activeTool === tool
                                ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {t(`tools.${tool}`)}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;