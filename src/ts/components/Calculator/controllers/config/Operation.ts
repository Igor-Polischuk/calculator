import { IError, IOperation } from "@components/Calculator/interfaces/ICalculator";
import { getFunctionRegWithParam, getNumberReg } from "../services/regularExp/regExpressions";
import { IExceptionObj } from "./exceptions";
import { Priority } from "./priority";

export class Operation implements IOperation {
    readonly reg: RegExp
    readonly calculate: (...args: number[]) => number
    private exceptionHandler: IExceptionObj[] = []
    // private exceptionMessege: string | undefined
    readonly priority: number

    constructor(config: {
        reg: RegExp
        priority: number
        calculate: (...args: number[]) => number,
        exceptionHandler?: IExceptionObj[]
    }) {
        this.reg = config.reg
        this.calculate = config.calculate
        this.exceptionHandler = config.exceptionHandler || []
        this.priority = config.priority
    }

    checkException(numbers: number[]): void {
        if (this.exceptionHandler.length === 0) return

        this.exceptionHandler.forEach(exception => {
            const isException = exception.checkException(...numbers)
            if (isException){
                const error: IError = {
                    message: `${exception.exceptionMessage}`,
                    meta: {}
                }
                throw [error]
            }
        })
    }
}

export class MathFuction extends Operation {
    constructor(config: { name: string, func: (...args: number[]) => number, exceptionHandler?: IExceptionObj[] }) {
        super({
            reg: getFunctionRegWithParam(config.name),
            priority: Priority.Hight,
            calculate: config.func,
            exceptionHandler: config.exceptionHandler
        });
    }
}

export class Constant extends Operation {
    constructor(name: string, value: number) {
        super({
            reg: new RegExp(name),
            priority: Priority.Constant,
            calculate: () => value
        });
    }
}
