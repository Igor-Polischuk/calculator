import { BaseElement } from "./BaseElement";
import { IButton } from "./interfaces";

interface IButtonParams {
    text: string,
    classNames: string,
    data?: Record<string, string>,
    type: string
}

export class Button extends BaseElement implements IButton{
    public type: string
    private text: string;
    private data?: Record<string, string> = {}
    private button: HTMLButtonElement
    constructor(params: IButtonParams) {
        super(params)
        this.text = params.text
        this.type = params.type
        this.data = params.data
        this.button = document.createElement('button')
        this.button.innerHTML= this.text
    }

    onClick(callback: (e: MouseEvent) => void) {
        this.button.addEventListener('click', (e) => callback(e))
    }

    get domElement(){
        return this.button
    }

    get metaData(){
        return this.data || {}
    }
}