import { CalculatorContainer } from './calculator/CalculatorContainer';
import { ICalculatorModel, ICalculatorView } from "@components/Calculator/interfaces/ICalculator";
import { CalculatorModelEvent } from "../calculator-model-event";


export class CalculatorView implements ICalculatorView {
    private calculatorUI: CalculatorContainer
    private model: ICalculatorModel
    constructor(model: ICalculatorModel) {
        this.model = model
        this.calculatorUI = new CalculatorContainer({
            onEqual: (expression) => this.model.setExpression(expression)
        })

        model.subscribe(CalculatorModelEvent.ResultChanged, (result) => {
            this.calculatorUI.showCalculationResult(result)
        })
        model.subscribe(CalculatorModelEvent.ErrorChanged, (error) => {
            this.calculatorUI.showCalculationError(error)
        })

        const root = document.querySelector('.container')!
        this.calculatorUI.element.render(root)
    }
}
