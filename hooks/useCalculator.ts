import { useReducer } from 'react';
import { CalculatorState, CalculatorAction, CalculatorActionType } from '../types';

const INITIAL_STATE: CalculatorState = {
  currentOperand: '0',
  previousOperand: null,
  operation: null,
  overwrite: false,
  memory: 0,
};

function evaluate({ currentOperand, previousOperand, operation }: Partial<CalculatorState>): string {
  const prev = parseFloat(previousOperand || '0');
  const current = parseFloat(currentOperand || '0');
  if (isNaN(prev) || isNaN(current)) return "";

  let computation = 0;
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '×':
      computation = prev * current;
      break;
    case '÷':
      computation = prev / current;
      break;
    case '^':
        computation = Math.pow(prev, current);
        break;
  }
  return computation.toString();
}

function reducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case CalculatorActionType.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: action.payload,
          overwrite: false,
        };
      }
      if (action.payload === '0' && state.currentOperand === '0') return state;
      if (action.payload === '.' && state.currentOperand?.includes('.')) return state;
      
      // Handle initial 0
      if (state.currentOperand === '0' && action.payload !== '.') {
          return {
              ...state,
              currentOperand: action.payload
          }
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${action.payload}`,
      };

    case CalculatorActionType.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) return state;

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: action.payload,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: action.payload,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: action.payload,
        currentOperand: null,
      };

    case CalculatorActionType.CLEAR:
      return { ...INITIAL_STATE, memory: state.memory }; // Preserve memory on clear

    case CalculatorActionType.DELETE:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: '0' }; // Reset to 0 instead of null
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case CalculatorActionType.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
    
    case CalculatorActionType.PERCENTAGE:
        if (state.currentOperand == null) return state;
        return {
            ...state,
            currentOperand: (parseFloat(state.currentOperand) / 100).toString(),
            overwrite: true
        }
    
    case CalculatorActionType.SQRT:
        if (state.currentOperand == null) return state;
        const val = parseFloat(state.currentOperand);
        if (val < 0) return { ...state, currentOperand: "Error" }; // Basic error handling
        return {
            ...state,
            currentOperand: Math.sqrt(val).toString(),
            overwrite: true
        }
        
    case CalculatorActionType.TOGGLE_SIGN:
        if (state.currentOperand == null) return state;
        return {
            ...state,
            currentOperand: (parseFloat(state.currentOperand) * -1).toString()
        }

    // Memory Operations
    case CalculatorActionType.MEMORY_ADD:
        return { ...state, memory: state.memory + parseFloat(state.currentOperand || '0'), overwrite: true };
    case CalculatorActionType.MEMORY_SUB:
        return { ...state, memory: state.memory - parseFloat(state.currentOperand || '0'), overwrite: true };
    case CalculatorActionType.MEMORY_RECALL:
        return { ...state, currentOperand: state.memory.toString(), overwrite: true };
    case CalculatorActionType.MEMORY_CLEAR:
        return { ...state, memory: 0 };

    default:
        return state;
  }
}

export function useCalculator() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return { state, dispatch };
}
