import { removeSpaces } from "@utilities/removeSpaces"
import { actio0nQueueValidator, bracketsValidator, expressionEndValidator, expressionStartValidator, pointValidate, unknownActionsvalidator, zeroDivisionValidator } from "./validators/"

interface Ivalidators {
    [validatorName: string]: (expression: string) => IError | undefined
}

interface IError {
    message: string
    where: number | undefined
}

export function validate(exp: string) {
    const erxpression = removeSpaces(exp)
    const validateResult = validateExpression(erxpression, {
        bracketsValidator,
        zeroDivisionValidator,
        unknownActionsvalidator,
        actio0nQueueValidator,
        pointValidate,
        expressionEndValidator,
        expressionStartValidator
    })
    return validateResult
}

function validateExpression(expression: string, validators: Ivalidators): IError[] {
    const errors: IError[] = []
    Object.keys(validators).forEach(validatorName => {
        const validateFunction = validators[validatorName]
        const validateResult = validateFunction(expression)
        if (validateResult) errors.push(validateResult)
    })
    // console.log(errors);
    
    return errors
}
