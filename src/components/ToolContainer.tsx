import React from 'react';
import { BMICalculator } from './tools/BMICalculator';
import { FortuneWheel } from './tools/FortuneWheel';
import { DiscountCalculator } from './tools/DiscountCalculator';
import { BasicCalculator } from './tools/BasicCalculator';
import { TextSorter } from './tools/TextSorter';
import { WordCounter } from './tools/WordCounter';
import { TemperatureConverter } from './tools/TemperatureConverter';
import { CompoundInterestCalculator } from './tools/CompoundInterestCalculator';
import { PasswordGenerator } from './tools/PasswordGenerator';
import { CalorieCalculator } from './tools/CalorieCalculator';
import { Category } from './Navigation';

interface ToolContainerProps {
  activeTool: string | null;
}

export function ToolContainer({ activeTool }: ToolContainerProps) {
  const renderTool = () => {
    switch (activeTool) {
      case 'bmi-calculator':
        return <BMICalculator />;
      case 'calorie-calculator':
        return <CalorieCalculator />;
      case 'fortune-wheel':
        return <FortuneWheel />;
      case 'password-generator':
        return <PasswordGenerator />;
      case 'discount-calculator':
        return <DiscountCalculator />;
      case 'compound-interest':
        return <CompoundInterestCalculator />;
      case 'basic-calculator':
        return <BasicCalculator />;
      case 'temperature-converter':
        return <TemperatureConverter />;
      case 'text-sorter':
        return <TextSorter />;
      case 'word-counter':
        return <WordCounter />;
      default:
        return null;
    }
  };

  if (!activeTool) {
    return null;
  }

  return (
    <div className="py-8">
      {renderTool()}
    </div>
  );
}