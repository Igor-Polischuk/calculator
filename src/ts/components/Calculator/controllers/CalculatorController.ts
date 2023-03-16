import { ICalculatorController, ICalculatorModel } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";
import { allowedActions, calculatorConfig, searchAllowedOperationsRegStr } from "./config/calculator-config";
import { getExpressionsFromBrackets, formatExpression, hasBrackets } from "./helpers";
import { validate } from "./validation/validate";

export class CalculatorController implements ICalculatorController {
    constructor(public model: ICalculatorModel) {
        this.model.subscribe(CalculatorObserverEvent.Expression, this.calculateExpression.bind(this))
    }


    private calculateExpression(inputExpression: string): void {
        const expression = formatExpression(inputExpression)
        const validationErrors = validate(expression)

        if (validationErrors.length > 0) {
            console.log(validationErrors);
            
            this.model.setError(validationErrors)
        } else {
            const result = this.calculate(expression);

            console.log(`${inputExpression} = ${result}`);
            this.model.setResult(result)
        }
    }

    private calculate(expression: string): number {
        if (!hasBrackets(expression)) {
            return this.calculateUnbracketedExpression(expression);
        }

        const bracketedExpressions = getExpressionsFromBrackets(expression)
        const unbracketedExpression = bracketedExpressions.reduce<string>((expressionAcc, currentBracketExpression) => {
            const currentBracketExpressionResult = this.calculateExpressionWithoutTerms(currentBracketExpression).toString()
            const currentBracketedExpressionInParens = this.wrapExpressionInBrackets(currentBracketExpression)
            return expressionAcc.replace(currentBracketedExpressionInParens, currentBracketExpressionResult)
        }, expression)

        return this.calculateUnbracketedExpression(unbracketedExpression);
    }

    private calculateExpressionWithoutTerms(expression: string) {
        return hasBrackets(expression) ?
            this.calculate(expression) :
            this.calculateUnbracketedExpression(expression)
    }

    private calculateUnbracketedExpression(expression: string): number {
        const orderedOperations = this.getOrderedOperations(expression)
        const result = orderedOperations.reduce<string>((resultAcc: string, operation: string) => {
            const { evaluatedExpression, result } = calculatorConfig[operation].calculateOperation(resultAcc)
            const resultString = result.toString()

            return resultAcc.replace(evaluatedExpression, resultString)
        }, expression)
        return Number(result)
    }
    private getOrderedOperations(expression: string): string[] {
        const operationsInExpression = this.getOperationsFromExpression(expression)

        const orderedOperations = [...operationsInExpression];
        return orderedOperations.sort((a, b) => calculatorConfig[b].priority - calculatorConfig[a].priority)
    }

    private getOperationsFromExpression(expression: string): string[] {
        const actionsExp = RegExp(searchAllowedOperationsRegStr, 'g')
        const operationsList = expression[0] === '-' ? expression.slice(1).match(actionsExp) : expression.match(actionsExp)
        return operationsList ?? []
    }

    private wrapExpressionInBrackets(bracketsExpression: string) {
        return `(${bracketsExpression})`
    }
}
