import React, { useState } from 'react';
import { Delete } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function BasicCalculator() {
  const { t } = useLanguage();
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let result = currentValue;

      switch (operation) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '×':
          result = currentValue * inputValue;
          break;
        case '÷':
          result = inputValue !== 0 ? currentValue / inputValue : 0;
          break;
        case '=':
          result = inputValue;
          break;
      }

      setPreviousValue(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    performOperation('=');
    setOperation(null);
    setPreviousValue(null);
    setWaitingForOperand(true);
  };

  const Button = ({ onClick, className, children, ...props }: any) => (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-semibold rounded-lg transition-all active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        {t('calculator.title')}
      </h2>
      
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
        <div className="text-right text-3xl font-mono text-gray-900 dark:text-white break-all">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        <Button
          onClick={clear}
          className="col-span-2 bg-red-500 hover:bg-red-600 text-white"
        >
          <Delete className="h-5 w-5 mx-auto" />
        </Button>
        <Button
          onClick={() => performOperation('÷')}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          ÷
        </Button>
        <Button
          onClick={() => performOperation('×')}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          ×
        </Button>
        
        <Button
          onClick={() => inputNumber('7')}
          className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white"
        >
          7
        </Button>
        <Button
          onClick={() => inputNumber('8')}
          className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white"
        >
          8
        </Button>
        <Button
          onClick={() => inputNumber('9')}
          className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white"
        >
          9
        </Button>
        <Button
          onClick={() => performOperation('-')}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          -
        </Button>
        
        <Button
          onClick={() => inputNumber('4')}
          className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white"
        >
          4
        </Button>
        <Button
          onClick={() => inputNumber('5')}
          className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white"
        >
          5
        </Button>
        <Button
          onClick={() => inputNumber('6')}
          className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white"
        >
          6
        </Button>
        <Button
          onClick={() => performOperation('+')}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          +
        </Button>
        
        <Button
          onClick={() => inputNumber('1')}
          className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white"
        >
          1
        </Button>
        <Button
          onClick={() => inputNumber('2')}
          className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white"
        >
          2
        </Button>
        <Button
          onClick={() => inputNumber('3')}
          className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white"
        >
          3
        </Button>
        <Button
          onClick={calculate}
          className="row-span-2 bg-green-500 hover:bg-green-600 text-white"
        >
          =
        </Button>
        
        <Button
          onClick={() => inputNumber('0')}
          className="col-span-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white"
        >
          0
        </Button>
        <Button
          onClick={inputDecimal}
          className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white"
        >
          .
        </Button>
      </div>
    </div>
  );
}