import { searchAllowedOperationsRegStr } from '../../config/calculator-config';
import { getMinusNumberReg, getNumberReg } from '../regularExp/regExpressions';

export function getOperationsFromExpression(expression: string): string[] {
  const actionsExp = RegExp(searchAllowedOperationsRegStr, 'g');
  const operationsList =
    expression[0] === '-' ? expression.slice(1).match(actionsExp) : expression.match(actionsExp);
  return operationsList ?? [];
}

