import React, { useEffect } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { CalculatorActionType } from '../types';
import { playClearSound, playEqualSound, playMemorySound } from '../utils/sound';
import Display from './Display';
import NeonButton from './NeonButton';

const Calculator: React.FC = () => {
  const { state, dispatch } = useCalculator();

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key >= '0' && e.key <= '9') {
            dispatch({ type: CalculatorActionType.ADD_DIGIT, payload: e.key });
        } else if (e.key === '.') {
            dispatch({ type: CalculatorActionType.ADD_DIGIT, payload: '.' });
        } else if (e.key === '=' || e.key === 'Enter') {
            e.preventDefault();
            playEqualSound();
            dispatch({ type: CalculatorActionType.EVALUATE });
        } else if (e.key === 'Backspace') {
            dispatch({ type: CalculatorActionType.DELETE });
        } else if (e.key === 'Escape') {
            playClearSound();
            dispatch({ type: CalculatorActionType.CLEAR });
        } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            const opMap: Record<string, string> = { '*': '×', '/': '÷' };
            dispatch({ type: CalculatorActionType.CHOOSE_OPERATION, payload: opMap[e.key] || e.key });
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  const handleClear = () => {
      playClearSound();
      dispatch({ type: CalculatorActionType.CLEAR });
  };

  const handleEvaluate = () => {
      playEqualSound();
      dispatch({ type: CalculatorActionType.EVALUATE });
  };
  
  const handleMemory = (type: CalculatorActionType) => {
      playMemorySound();
      dispatch({ type });
  }

  return (
    <div className="w-full max-w-md bg-neon-panel/90 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-10">
      
      {/* Decorative screws/tech elements */}
      <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-gray-700 shadow-inner"></div>
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gray-700 shadow-inner"></div>
      <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-gray-700 shadow-inner"></div>
      <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-gray-700 shadow-inner"></div>

      <div className="mb-4 text-center">
        <h1 className="font-orbitron text-gray-500 text-xs tracking-[0.3em] uppercase opacity-50">Neon Systems v1.0</h1>
      </div>

      <Display 
        value={state.currentOperand || "0"} 
        previousValue={state.previousOperand}
        operation={state.operation}
        hasMemory={state.memory !== 0}
      />

      <div className="grid grid-cols-4 gap-3 md:gap-4">
        {/* Memory Row */}
        <NeonButton label="MC" variant="secondary" onClick={() => handleMemory(CalculatorActionType.MEMORY_CLEAR)} className="text-sm" />
        <NeonButton label="MR" variant="secondary" onClick={() => handleMemory(CalculatorActionType.MEMORY_RECALL)} className="text-sm" />
        <NeonButton label="M-" variant="secondary" onClick={() => handleMemory(CalculatorActionType.MEMORY_SUB)} className="text-sm" />
        <NeonButton label="M+" variant="secondary" onClick={() => handleMemory(CalculatorActionType.MEMORY_ADD)} className="text-sm" />

        {/* Function Row */}
        <NeonButton label="AC" variant="danger" onClick={handleClear} />
        <NeonButton label="√" variant="secondary" onClick={() => dispatch({ type: CalculatorActionType.SQRT })} />
        <NeonButton label="%" variant="secondary" onClick={() => dispatch({ type: CalculatorActionType.PERCENTAGE })} />
        <NeonButton label="÷" variant="accent" onClick={() => dispatch({ type: CalculatorActionType.CHOOSE_OPERATION, payload: '÷' })} />

        {/* Numbers Row 7-9 */}
        <NeonButton label="7" onClick={() => dispatch({ type: CalculatorActionType.ADD_DIGIT, payload: '7' })} />
        <NeonButton label="8" onClick={() => dispatch({ type: CalculatorActionType.ADD_DIGIT, payload: '8' })} />
        <NeonButton label="9" onClick={() => dispatch({ type: CalculatorActionType.ADD_DIGIT, payload: '9' })} />
        <NeonButton label="×" variant="accent" onClick={() => dispatch({ type: CalculatorActionType.CHOOSE_OPERATION, payload: '×' })} />

        {/* Numbers Row 4-6 */}
        <NeonButton label="4" onClick={() => dispatch({ type: CalculatorActionType.ADD_DIGIT, payload: '4' })} />
        <NeonButton label="5" onClick={() => dispatch({ type: CalculatorActionType.ADD_DIGIT, payload: '5' })} />
        <NeonButton label="6" onClick={() => dispatch({ type: CalculatorActionType.ADD_DIGIT, payload: '6' })} />
        <NeonButton label="-" variant="accent" onClick={() => dispatch({ type: CalculatorActionType.CHOOSE_OPERATION, payload: '-' })} />

        {/* Numbers Row 1-3 */}
        <NeonButton label="1" onClick={() => dispatch({ type: CalculatorActionType.ADD_DIGIT, payload: '1' })} />
        <NeonButton label="2" onClick={() => dispatch({ type: CalculatorActionType.ADD_DIGIT, payload: '2' })} />
        <NeonButton label="3" onClick={() => dispatch({ type: CalculatorActionType.ADD_DIGIT, payload: '3' })} />
        <NeonButton label="+" variant="accent" onClick={() => dispatch({ type: CalculatorActionType.CHOOSE_OPERATION, payload: '+' })} />

        {/* Bottom Row */}
        <NeonButton label="0" onClick={() => dispatch({ type: CalculatorActionType.ADD_DIGIT, payload: '0' })} />
        <NeonButton label="." onClick={() => dispatch({ type: CalculatorActionType.ADD_DIGIT, payload: '.' })} />
        <NeonButton label="=" variant="accent" doubleWidth onClick={handleEvaluate} />
      </div>
    </div>
  );
};

export default Calculator;
