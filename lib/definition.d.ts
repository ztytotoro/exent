export interface IPos {
    x: number;
    y: number;
}
export interface IMouseEvent extends IPos {
    target: EventTarget | null;
}
export interface IDragEvent extends IMouseEvent {
    offsetX: number;
    offsetY: number;
    distanceX: number;
    distanceY: number;
}
export declare function pos(x: number, y: number): {
    x: number;
    y: number;
};
