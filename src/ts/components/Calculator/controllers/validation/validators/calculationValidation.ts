import { ExpressionValidation } from '../../services/processing/ExpressionValidation';
import { calculatorConfig } from "../../config/calculator-config";
import { IError } from "@components/Calculator/interfaces/ICalculator"

export function calculationValidation(expression: string): IError | undefined {
    if (Number(expression)) {
        return
    }

    const expressionValidation = new ExpressionValidation()
    const replacingResult = expressionValidation.processBracketedExpression(expression)

    if (replacingResult === '0') {
        return
    }

    return {
        message: 'unresolved expression format',
        meta: {
            description: `wrong entry in: ${replacingResult.replace('0', '___')}`
        }
    }
}

function validateUnbracketedExpression(resultAcc: string, operation: string): string {
    const currentOperationObj = calculatorConfig[operation];
    const matchedExpressionWithOperation = resultAcc.match(currentOperationObj.reg)
    if (!matchedExpressionWithOperation) {
        return resultAcc
    }
    return resultAcc.replace(matchedExpressionWithOperation[0], '0')
}