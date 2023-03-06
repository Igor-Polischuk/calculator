import { CalculatorController } from "./controllers/CalculatorController";
import { CalculatorView } from "./views/CalculatorView";
import { CalculatorModel } from "./models/CalculatorModel";

export function initCalculator(){
    const calculatorModel = new CalculatorModel()
    new CalculatorController(calculatorModel)
    new CalculatorView(calculatorModel)
    calculatorModel.setExpression('8 + 2 * (3 + (5 - 3)) - 10 / 2 * (6 - 4)') //8
    calculatorModel.setExpression('2 +  (1 + (3 + 2 * (4 + 5)))') //24
    calculatorModel.setExpression('8+2*(3+(5 -3))-10/2*(6-4)') //8
    calculatorModel.setExpression('3*5*((2+2*2)-5*1)*2') //30
    calculatorModel.setExpression('((10 - 5) * sqrt(sqrt16))^3') //1000
    // calculatorModel.setExpression('())2/0') //5
    calculatorModel.setExpression('3*22.3*(2-5/3)*0.52-(sqrt10)') //30
    // calculatorModel.setExpression('(*10)') //30
}

export {CalculatorController, CalculatorModel, CalculatorView}