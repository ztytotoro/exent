import { Observable } from 'rxjs';
interface IPos {
    x: number;
    y: number;
}
interface IMouseEvent extends IPos {
    target: EventTarget | null;
}
interface IDragEvent extends IMouseEvent {
    offsetX: number;
    offsetY: number;
    distanceX: number;
    distanceY: number;
}
export declare function pos(x: number, y: number): {
    x: number;
    y: number;
};
export declare function collectEvent(interval?: number): {
    mousemove: Observable<IMouseEvent>;
    mousedown: Observable<IMouseEvent>;
    mouseup: Observable<IMouseEvent>;
    drag: Observable<IDragEvent>;
};
export declare function draggable(target: HTMLElement): void;
export {};
