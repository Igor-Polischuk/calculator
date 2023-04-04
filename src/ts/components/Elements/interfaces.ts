export interface IBaseElementParams {
    parentNode?: Element,
    classNames?: string
}

export interface IBaseElement {
    domElement: Element,
    append: (...elements: IBaseElement[]) => void
    render: (parentNode: Element) => void
    onClick: (callback: (e: Event) => void) => void
}
export interface IButton extends IBaseElement {
    metaData: Record<string, string>
    type: string
}

export interface IInput extends IBaseElement {
    onInput: (callback: (e: Event) => void) => void
    value: string
}

export interface IDivElement extends IBaseElement{
}

export interface IDivElement extends IBaseElement{
    
}