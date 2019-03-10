import { WindowModal } from "./index";

export interface IWindowModalOptions {
    title: string;
    elementSelector?: string;
}

export interface IWindowBarOptions {
    title: string;
    window: WindowModal;
    icon?: IWindowIcon;
    hideClose?: boolean;
    hideMinimize?: boolean;
    compact?: boolean;
}

export interface IWindowIcon {
    src?: string;
    innerHTML?: string;
    element?: HTMLElement;
    selector?: string;
}
