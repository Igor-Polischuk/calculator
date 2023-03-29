export interface IBaseElementParams {
    parentNode?: Element,
    classNames?: string
}

export interface IBaseElement {
    domElement: Element,
    render: (parentNode: Element) => void
}
export interface IButton extends IBaseElement {
    onClick: (callback: (e: MouseEvent) => void) => void
    metaData: Record<string, string>
    getButtonRole?: string
}

export interface IInput extends IBaseElement {
    onInput: (callback: (e: Event) => void) => void
    value: string
}

export interface IDivElement extends IBaseElement{
    append: (...elements: IBaseElement[]) => void
}

export interface IDivElement extends IBaseElement{
    
}