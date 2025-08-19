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
      case 'bmiCalculator':
        return <BMICalculator />;
      case 'calorieCalculator':
        return <CalorieCalculator />;
      case 'fortuneWheel':
        return <FortuneWheel />;
      case 'passwordGenerator':
        return <PasswordGenerator />;
      case 'discountCalculator':
        return <DiscountCalculator />;
      case 'compoundInterest':
        return <CompoundInterestCalculator />;
      case 'basicCalculator':
        return <BasicCalculator />;
      case 'temperatureConverter':
        return <TemperatureConverter />;
      case 'textSorter':
        return <TextSorter />;
      case 'wordCounter':
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