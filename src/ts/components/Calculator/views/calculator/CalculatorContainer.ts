import { IError } from '../../interfaces/ICalculator';
import { CalculatorOutput } from './CalculatorOutput/CalculatorOutput';
import { DivElement } from '@components/Elements/DivElement';
import { CalculatorInput } from './CalculatorInput/CalculatorInput';
import { CalculatorKeyboard } from './CalculatorKeyboard/CalculatorKeyboard';
import { CalculatorDetail } from './CalculatorDetail/CalculatorDetail';

interface ICalculatorUIParams {
    onEqual: (expression: string) => void;
}

export class CalculatorContainer {
    private calculatorWrapper: DivElement;
    private calculatorInput: CalculatorInput;
    private calculatorOutput: CalculatorOutput;
    private calculatorKeyboard: CalculatorKeyboard;
    private calculatorDetail: CalculatorDetail;
    private params: ICalculatorUIParams;

    constructor(params: ICalculatorUIParams) {
        this.params = params;
        this.calculatorWrapper = new DivElement({ classNames: 'calculator' });
        this.calculatorInput = new CalculatorInput();
        this.calculatorOutput = new CalculatorOutput({
            onErrorClick: this.onErrorClick.bind(this)
        });
        this.calculatorDetail = new CalculatorDetail();
        this.calculatorKeyboard = new CalculatorKeyboard({
            onEqual: this.setExpression.bind(this),
            onChar: this.onButtonClick.bind(this),
            onBackspace: this.onBackspace.bind(this),
            onReset: () => this.calculatorInput.setInputValue(''),
        });

        this.calculatorWrapper.append(
            this.calculatorInput.element,
            this.calculatorOutput.element,
            this.calculatorKeyboard.element,
            this.calculatorDetail.element
        );
    }

    get element() {
        return this.calculatorWrapper
    }

    showCalculationResult(result: number){
        const calculatedExpression = this.calculatorInput.inputText
        this.calculatorOutput.showCalculationResult(result, calculatedExpression)
        this.calculatorInput.setInputValue(result.toString())
        this.calculatorDetail.hideDetail()
    }

    showCalculationError(errors: IError[]){
        const expressionWithError  = this.calculatorInput.inputText
        this.calculatorOutput.showCalculationError(errors, expressionWithError )
        this.calculatorDetail.showErrorsInfo(errors)
    }

    private onErrorClick(from: number, to: number){
        this.calculatorInput.inputElement.focus()
        this.calculatorInput.inputElement.setSelectionRange(from, to + 1);
    }

    private onButtonClick(clickedButtonValue: string){
        const newInputValue = this.calculatorInput.inputText + clickedButtonValue
        this.calculatorInput.setInputValue(newInputValue)
    }

    private onBackspace(){
        const newInputValue = this.calculatorInput.inputText.slice(0, -1)
        this.calculatorInput.setInputValue(newInputValue)
    }

    private setExpression() {
        const expression = this.calculatorInput.inputText
        const isExpressionEmpty = expression.trim() === ''

        if (!isExpressionEmpty) {
            this.params.onEqual(expression);
        }
    }
}
