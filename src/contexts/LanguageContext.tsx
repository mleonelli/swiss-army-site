import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en';// | 'es' | 'fr' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'app.title': 'Swiss Army Site',
    'nav.textTools': 'Text Tools',
    'nav.calculationTools': 'Calculation Tools',
    'nav.financialTools': 'Financial Tools',
    'nav.randomizerTools': 'Randomizer Tools',
    'nav.healthTools': 'Health Tools',
    
    // Subcategories
    'nav.textProcessing': 'Text Processing',
    'nav.textAnalysis': 'Text Analysis',
    'nav.basicMath': 'Basic Math',
    'nav.unitConversion': 'Unit Conversion',
    'nav.pricing': 'Pricing',
    'nav.investment': 'Investment',
    'nav.decisionMaking': 'Decision Making',
    'nav.generators': 'Generators',
    'nav.bodyMetrics': 'Body Metrics',
    'nav.fitness': 'Fitness',
    
    // Tools
    'tools.textSorter': 'Text Sorter',
    'tools.wordCounter': 'Word Counter',
    'tools.basicCalculator': 'Basic Calculator',
    'tools.temperatureConverter': 'Temperature Converter',
    'tools.discountCalculator': 'Discount Calculator',
    'tools.compoundInterest': 'Compound Interest',
    'tools.fortuneWheel': 'Fortune Wheel',
    'tools.passwordGenerator': 'Password Generator',
    'tools.bmiCalculator': 'BMI Calculator',
    'tools.calorieCalculator': 'Calorie Calculator',
    
    // Common
    'common.calculate': 'Calculate',
    'common.clear': 'Clear',
    'common.result': 'Result',
    'common.spin': 'Spin',
    'common.sort': 'Sort',
    'common.reset': 'Reset',
    
    // BMI Calculator
    'bmi.title': 'BMI Calculator',
    'bmi.weight': 'Weight (kg)',
    'bmi.height': 'Height (cm)',
    'bmi.result': 'Your BMI is',
    'bmi.underweight': 'Underweight',
    'bmi.normal': 'Normal weight',
    'bmi.overweight': 'Overweight',
    'bmi.obese': 'Obese',
    
    // Fortune Wheel
    'wheel.title': 'Fortune Wheel',
    'wheel.addChoice': 'Add Choice',
    'wheel.enterChoice': 'Enter a choice...',
    'wheel.result': 'Result',
    
    // Discount Calculator
    'discount.title': 'Discount Calculator',
    'discount.originalPrice': 'Original Price',
    'discount.discountPercent': 'Discount %',
    'discount.finalPrice': 'Final Price',
    'discount.savings': 'You save',
    
    // Basic Calculator
    'calculator.title': 'Basic Calculator',
    
    // Text Sorter
    'sorter.title': 'Text Line Sorter',
    'sorter.placeholder': 'Enter text lines here...',
    'sorter.alphabetical': 'Sort Alphabetically',
    'sorter.byLength': 'Sort by Length',
    
    // Welcome
    'welcome.title': 'Welcome to Swiss Army Site',
    'welcome.subtitle': 'Your collection of useful web tools',
    'welcome.description': 'Choose a category from the navigation to access various tools that can help you with calculations, text processing, and more. Each category contains specialized subcategories with focused tools.',
  },
  es: {
    // Navigation
    'app.title': 'Sitio Navaja Suiza',
    'nav.textTools': 'Herramientas de Texto',
    'nav.calculationTools': 'Herramientas de Cálculo',
    'nav.financialTools': 'Herramientas Financieras',
    'nav.randomizerTools': 'Herramientas Aleatorias',
    'nav.healthTools': 'Herramientas de Salud',
    
    // Subcategories
    'nav.textProcessing': 'Procesamiento de Texto',
    'nav.textAnalysis': 'Análisis de Texto',
    'nav.basicMath': 'Matemáticas Básicas',
    'nav.unitConversion': 'Conversión de Unidades',
    'nav.pricing': 'Precios',
    'nav.investment': 'Inversión',
    'nav.decisionMaking': 'Toma de Decisiones',
    'nav.generators': 'Generadores',
    'nav.bodyMetrics': 'Métricas Corporales',
    'nav.fitness': 'Fitness',
    
    // Tools
    'tools.textSorter': 'Ordenador de Texto',
    'tools.wordCounter': 'Contador de Palabras',
    'tools.basicCalculator': 'Calculadora Básica',
    'tools.temperatureConverter': 'Conversor de Temperatura',
    'tools.discountCalculator': 'Calculadora de Descuentos',
    'tools.compoundInterest': 'Interés Compuesto',
    'tools.fortuneWheel': 'Rueda de la Fortuna',
    'tools.passwordGenerator': 'Generador de Contraseñas',
    'tools.bmiCalculator': 'Calculadora de IMC',
    'tools.calorieCalculator': 'Calculadora de Calorías',
    
    // Common
    'common.calculate': 'Calcular',
    'common.clear': 'Limpiar',
    'common.result': 'Resultado',
    'common.spin': 'Girar',
    'common.sort': 'Ordenar',
    'common.reset': 'Reiniciar',
    
    // BMI Calculator
    'bmi.title': 'Calculadora de IMC',
    'bmi.weight': 'Peso (kg)',
    'bmi.height': 'Altura (cm)',
    'bmi.result': 'Su IMC es',
    'bmi.underweight': 'Bajo peso',
    'bmi.normal': 'Peso normal',
    'bmi.overweight': 'Sobrepeso',
    'bmi.obese': 'Obesidad',
    
    // Fortune Wheel
    'wheel.title': 'Rueda de la Fortuna',
    'wheel.addChoice': 'Añadir Opción',
    'wheel.enterChoice': 'Ingresa una opción...',
    'wheel.result': 'Resultado',
    
    // Discount Calculator
    'discount.title': 'Calculadora de Descuentos',
    'discount.originalPrice': 'Precio Original',
    'discount.discountPercent': 'Descuento %',
    'discount.finalPrice': 'Precio Final',
    'discount.savings': 'Ahorras',
    
    // Basic Calculator
    'calculator.title': 'Calculadora Básica',
    
    // Text Sorter
    'sorter.title': 'Ordenador de Líneas',
    'sorter.placeholder': 'Ingresa líneas de texto aquí...',
    'sorter.alphabetical': 'Ordenar Alfabéticamente',
    'sorter.byLength': 'Ordenar por Longitud',
    
    // Welcome
    'welcome.title': 'Bienvenido al Sitio Navaja Suiza',
    'welcome.subtitle': 'Tu colección de herramientas web útiles',
    'welcome.description': 'Elige una categoría de la navegación para acceder a varias herramientas que pueden ayudarte con cálculos, procesamiento de texto y más. Cada categoría contiene subcategorías especializadas con herramientas enfocadas.',
  },
  fr: {
    // Navigation
    'app.title': 'Site Couteau Suisse',
    'nav.textTools': 'Outils de Texte',
    'nav.calculationTools': 'Outils de Calcul',
    'nav.financialTools': 'Outils Financiers',
    'nav.randomizerTools': 'Outils Aléatoires',
    'nav.healthTools': 'Outils de Santé',
    
    // Subcategories
    'nav.textProcessing': 'Traitement de Texte',
    'nav.textAnalysis': 'Analyse de Texte',
    'nav.basicMath': 'Mathématiques de Base',
    'nav.unitConversion': 'Conversion d\'Unités',
    'nav.pricing': 'Tarification',
    'nav.investment': 'Investissement',
    'nav.decisionMaking': 'Prise de Décision',
    'nav.generators': 'Générateurs',
    'nav.bodyMetrics': 'Métriques Corporelles',
    'nav.fitness': 'Fitness',
    
    // Tools
    'tools.textSorter': 'Trieur de Texte',
    'tools.wordCounter': 'Compteur de Mots',
    'tools.basicCalculator': 'Calculatrice de Base',
    'tools.temperatureConverter': 'Convertisseur de Température',
    'tools.discountCalculator': 'Calculateur de Remise',
    'tools.compoundInterest': 'Intérêts Composés',
    'tools.fortuneWheel': 'Roue de la Fortune',
    'tools.passwordGenerator': 'Générateur de Mot de Passe',
    'tools.bmiCalculator': 'Calculateur IMC',
    'tools.calorieCalculator': 'Calculateur de Calories',
    
    // Common
    'common.calculate': 'Calculer',
    'common.clear': 'Effacer',
    'common.result': 'Résultat',
    'common.spin': 'Tourner',
    'common.sort': 'Trier',
    'common.reset': 'Réinitialiser',
    
    // BMI Calculator
    'bmi.title': 'Calculateur IMC',
    'bmi.weight': 'Poids (kg)',
    'bmi.height': 'Taille (cm)',
    'bmi.result': 'Votre IMC est',
    'bmi.underweight': 'Insuffisance pondérale',
    'bmi.normal': 'Poids normal',
    'bmi.overweight': 'Surpoids',
    'bmi.obese': 'Obésité',
    
    // Fortune Wheel
    'wheel.title': 'Roue de la Fortune',
    'wheel.addChoice': 'Ajouter un Choix',
    'wheel.enterChoice': 'Entrez un choix...',
    'wheel.result': 'Résultat',
    
    // Discount Calculator
    'discount.title': 'Calculateur de Remise',
    'discount.originalPrice': 'Prix Original',
    'discount.discountPercent': 'Remise %',
    'discount.finalPrice': 'Prix Final',
    'discount.savings': 'Vous économisez',
    
    // Basic Calculator
    'calculator.title': 'Calculatrice Basique',
    
    // Text Sorter
    'sorter.title': 'Trieur de Lignes',
    'sorter.placeholder': 'Entrez les lignes de texte ici...',
    'sorter.alphabetical': 'Trier Alphabétiquement',
    'sorter.byLength': 'Trier par Longueur',
    
    // Welcome
    'welcome.title': 'Bienvenue sur le Site Couteau Suisse',
    'welcome.subtitle': 'Votre collection d\'outils web utiles',
    'welcome.description': 'Choisissez une catégorie dans la navigation pour accéder à divers outils qui peuvent vous aider avec des calculs, du traitement de texte et plus. Chaque catégorie contient des sous-catégories spécialisées avec des outils ciblés.',
  },
  de: {
    // Navigation
    'app.title': 'Schweizer Messer Site',
    'nav.textTools': 'Text-Tools',
    'nav.calculationTools': 'Berechnungs-Tools',
    'nav.financialTools': 'Finanz-Tools',
    'nav.randomizerTools': 'Zufalls-Tools',
    'nav.healthTools': 'Gesundheits-Tools',
    
    // Subcategories
    'nav.textProcessing': 'Textverarbeitung',
    'nav.textAnalysis': 'Textanalyse',
    'nav.basicMath': 'Grundmathematik',
    'nav.unitConversion': 'Einheitenumrechnung',
    'nav.pricing': 'Preisgestaltung',
    'nav.investment': 'Investition',
    'nav.decisionMaking': 'Entscheidungsfindung',
    'nav.generators': 'Generatoren',
    'nav.bodyMetrics': 'Körpermetriken',
    'nav.fitness': 'Fitness',
    
    // Tools
    'tools.textSorter': 'Text-Sortierer',
    'tools.wordCounter': 'Wortzähler',
    'tools.basicCalculator': 'Grundrechner',
    'tools.temperatureConverter': 'Temperaturumrechner',
    'tools.discountCalculator': 'Rabattrechner',
    'tools.compoundInterest': 'Zinseszins',
    'tools.fortuneWheel': 'Glücksrad',
    'tools.passwordGenerator': 'Passwort-Generator',
    'tools.bmiCalculator': 'BMI-Rechner',
    'tools.calorieCalculator': 'Kalorienrechner',
    
    // Common
    'common.calculate': 'Berechnen',
    'common.clear': 'Löschen',
    'common.result': 'Ergebnis',
    'common.spin': 'Drehen',
    'common.sort': 'Sortieren',
    'common.reset': 'Zurücksetzen',
    
    // BMI Calculator
    'bmi.title': 'BMI-Rechner',
    'bmi.weight': 'Gewicht (kg)',
    'bmi.height': 'Größe (cm)',
    'bmi.result': 'Ihr BMI ist',
    'bmi.underweight': 'Untergewicht',
    'bmi.normal': 'Normalgewicht',
    'bmi.overweight': 'Übergewicht',
    'bmi.obese': 'Adipositas',
    
    // Fortune Wheel
    'wheel.title': 'Glücksrad',
    'wheel.addChoice': 'Option Hinzufügen',
    'wheel.enterChoice': 'Option eingeben...',
    'wheel.result': 'Ergebnis',
    
    // Discount Calculator
    'discount.title': 'Rabattrechner',
    'discount.originalPrice': 'Originalpreis',
    'discount.discountPercent': 'Rabatt %',
    'discount.finalPrice': 'Endpreis',
    'discount.savings': 'Sie sparen',
    
    // Basic Calculator
    'calculator.title': 'Grundrechner',
    
    // Text Sorter
    'sorter.title': 'Text-Sortierer',
    'sorter.placeholder': 'Textzeilen hier eingeben...',
    'sorter.alphabetical': 'Alphabetisch sortieren',
    'sorter.byLength': 'Nach Länge sortieren',
    
    // Welcome
    'welcome.title': 'Willkommen bei Schweizer Messer Site',
    'welcome.subtitle': 'Ihre Sammlung nützlicher Web-Tools',
    'welcome.description': 'Wählen Sie eine Kategorie aus der Navigation, um auf verschiedene Tools zuzugreifen, die Ihnen bei Berechnungen, Textverarbeitung und mehr helfen können. Jede Kategorie enthält spezialisierte Unterkategorien mit fokussierten Tools.',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && savedLanguage in translations) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}