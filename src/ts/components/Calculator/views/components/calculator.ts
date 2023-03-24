import { IError } from './../../interfaces/ICalculator';
import { CalculatorResultDisplay } from './ResultBlock/CalculatorResultDisplay';
import { DivElement } from "@components/Elements/DivElement";
import { Observer } from "@utilities/Observer/Observer";
import { CalculatorInput } from "./CalculatorInput/CalculatorInput";
import { CalculatorKeyboard } from "./CalculatorKeyboard/CalculatorKeyboard";
import { ViewEvent } from '../view-observer-events';

type CalculatorEvents = {
    [ViewEvent.EnteredExpressionChanged]: string
}

export class Calculator extends Observer<CalculatorEvents>{
    private calculatorBlock = new DivElement({
        classNames: 'calculator'
    })
    private calculatorInput = new CalculatorInput()
    private calculatorKeyboard = new CalculatorKeyboard({
        resultBtnHandler: this.setExpression.bind(this),
        keyboardValueHandler: (value) => this.calculatorInput.update(value)
    })
    private resultBlock = new CalculatorResultDisplay()
    constructor(){
        super()
        this.calculatorBlock.append(this.calculatorInput.element, this.resultBlock.element, this.calculatorKeyboard.element)
    }

    renderResult(result: number){
        this.resultBlock.showResult(result, this.calculatorInput.inputText)
        const resultStr = result.toString()
        this.calculatorInput.update(resultStr)
        this.calculatorKeyboard.setValue(resultStr)
    }

    renderError(errors: IError[]){
        this.resultBlock.showError(errors, this.calculatorInput.inputText)
    }

    get element(){
        return this.calculatorBlock
    }

    private setExpression(){
        const expression = this.calculatorInput.inputText
        this.notifyAll(ViewEvent.EnteredExpressionChanged, expression)
    }
}