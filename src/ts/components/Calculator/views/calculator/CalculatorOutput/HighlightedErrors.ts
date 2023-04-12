import { IErrorRange } from "@components/Calculator/interfaces/ICalculator";
import { Paragraph } from "@components/Elements/Paragraph";
import { Span } from "@components/Elements/Span";

interface IHighlightedErrorsParams {
    errorRanges: IErrorRange[]
    expressionWithErrors: string
    onErrorClick: (range: IErrorRange) => void
}

interface IHighlightErrorsReduce {
    lastErrorIndex: number
    spansArray: Span[]
}

export class HighlightedErrors {
    private paragraphWrapper: Paragraph
    private params: IHighlightedErrorsParams
    constructor(params: IHighlightedErrorsParams) {
        this.paragraphWrapper = new Paragraph({ text: '', classNames: 'error', id: 'result-display' })
        this.params = params
        this.paragraphWrapper.append(...this.highlightErrors())
    }

    get element() {
        return this.paragraphWrapper
    }

    private highlightErrors() {
        const { spansArray, lastErrorIndex } = this.params.errorRanges.reduce<IHighlightErrorsReduce>(
            ({ spansArray, lastErrorIndex }, { from, to }) => {
                const notErrorString = this.params.expressionWithErrors.slice(lastErrorIndex, from)
                const notErrorSpan = new Span({ text: notErrorString })
                const errorString = this.params.expressionWithErrors.slice(from, to + 1)
                const errorSpan = new Span({ text: errorString, classNames: 'error-span' })
                errorSpan.onClick(() => this.params.onErrorClick({ from, to }))
                return {
                    spansArray: [...spansArray, notErrorSpan, errorSpan],
                    lastErrorIndex: from + (to - from) + 1
                };
            }, { lastErrorIndex: 0, spansArray: [] })

        return spansArray.concat(new Span({ text: this.params.expressionWithErrors.slice(lastErrorIndex) }))
    }
}