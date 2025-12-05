export enum CalculatorActionType {
  ADD_DIGIT = 'ADD_DIGIT',
  CHOOSE_OPERATION = 'CHOOSE_OPERATION',
  CLEAR = 'CLEAR',
  DELETE = 'DELETE',
  EVALUATE = 'EVALUATE',
  PERCENTAGE = 'PERCENTAGE',
  TOGGLE_SIGN = 'TOGGLE_SIGN',
  SQRT = 'SQRT',
  MEMORY_ADD = 'MEMORY_ADD',
  MEMORY_SUB = 'MEMORY_SUB',
  MEMORY_RECALL = 'MEMORY_RECALL',
  MEMORY_CLEAR = 'MEMORY_CLEAR',
}

export type CalculatorState = {
  currentOperand: string | null;
  previousOperand: string | null;
  operation: string | null;
  overwrite: boolean;
  memory: number;
};

export type CalculatorAction =
  | { type: CalculatorActionType.ADD_DIGIT; payload: string }
  | { type: CalculatorActionType.CHOOSE_OPERATION; payload: string }
  | { type: CalculatorActionType.CLEAR }
  | { type: CalculatorActionType.DELETE }
  | { type: CalculatorActionType.EVALUATE }
  | { type: CalculatorActionType.PERCENTAGE }
  | { type: CalculatorActionType.TOGGLE_SIGN }
  | { type: CalculatorActionType.SQRT }
  | { type: CalculatorActionType.MEMORY_ADD }
  | { type: CalculatorActionType.MEMORY_SUB }
  | { type: CalculatorActionType.MEMORY_RECALL }
  | { type: CalculatorActionType.MEMORY_CLEAR };
