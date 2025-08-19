import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import Navigation, { Category } from './components/Navigation';
import { Welcome } from './components/Welcome';
import { ToolContainer } from './components/ToolContainer';

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('welcome');
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Header />
          <Navigation 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
            activeSubcategory={activeSubcategory}
            setActiveSubcategory={setActiveSubcategory}
            activeTool={activeTool}
            setActiveTool={setActiveTool}
          />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeCategory === 'welcome' || !activeTool ? (
              <Welcome />
            ) : (
              <ToolContainer activeTool={activeTool} />
            )}
          </main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;