import { IObserver } from "@utilities/Observer/IObserver"
import { CalculatorModelEvent } from "../calculator-model-event";
import { IAppError } from "../../../errors/IErrors";

export type ModelAllowedEvents = {
    [CalculatorModelEvent.ResultChanged]: number
    [CalculatorModelEvent.ExpressionChanged]: string
    [CalculatorModelEvent.ErrorChanged]: IAppError
};

export interface ICalculatorModel extends IObserver<ModelAllowedEvents> {
    setResult: (result: number) => void
    setExpression: (expression: string) => void
    setError: (errors: IAppError) => void
}

export interface ICalculatorView { }

export interface ICalculatorController { }
