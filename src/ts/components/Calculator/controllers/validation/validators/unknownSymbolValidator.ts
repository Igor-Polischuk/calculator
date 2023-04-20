import { IError } from "exceptions/IErrors"
import { getSubstringsIndexes } from "../helpers/getSubstringsIndexes";
import { Error } from "../error"
import { searchAllowedOperationsRegStr } from "../../calculator-config";
import { incorrectFunctionNameValidator } from "./incorrectFunctionNameValidator";

export function unknownSymbolValidator(expression: string): IError | undefined {
    const unknownSymbolReg = new RegExp(`[^0-9${searchAllowedOperationsRegStr}().]`, "g")
    const unknownSymbols = expression.match(unknownSymbolReg)

    if (unknownSymbols) {
        return {
            message: Error.UnknownSymbolError,
            payload: {
                errorPlace: getSubstringsIndexes(unknownSymbols, expression)
            }
        }
    }
    return incorrectFunctionNameValidator(expression)
}