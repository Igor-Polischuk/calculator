import { calculatorConfig } from "../../config/calculator-config";
import { getMostNestedParentheses } from "../brackets/getMostNestedParentheses";
import { hasBrackets } from "../brackets/hasBrackets";
import { getOperationsFromExpression } from "../expressionGetters/getOperationsFromExpression";
import { unwrapBracketInExpression } from "../formatting/unwrapExpressionTerms";

export class ExpressionProcessor {
    constructor() { }

    processBracketedExpression(expression: string): string {
        const bracketsExpressions = getMostNestedParentheses(expression);
        const replacedMostNestedBrackets = bracketsExpressions.reduce<string>(
            (expressionAcc, currentBracketExpression) => {
                const unbracketedExpression = unwrapBracketInExpression(currentBracketExpression);
                const currentBracketExpressionResult = this.processUnbracketedExpression(unbracketedExpression)
                return expressionAcc.replace(currentBracketExpression, currentBracketExpressionResult);
            }, expression);
        return hasBrackets(replacedMostNestedBrackets)
            ? this.processBracketedExpression(replacedMostNestedBrackets)
            : this.processUnbracketedExpression(replacedMostNestedBrackets)
    }

    private processUnbracketedExpression(expression: string): string {
        const expressionOperators = this.getOperationsOrderFromExpression(expression)
        const result = expressionOperators.reduce<string>((expressionAcc, operation) => {
            return this.descendantProcessor(expressionAcc, operation)
        }, expression)

        return result
    }

    protected descendantProcessor(resultAcc: string, operation: string): string {
        throw new Error('there is no override')
    }

    private getOperationsOrderFromExpression(expression: string) {
        const expressionOperators = getOperationsFromExpression(expression)
        const orderedOperations = expressionOperators.sort(
            (a, b) => calculatorConfig[b].priority - calculatorConfig[a].priority,
        );

        return orderedOperations
    }
}