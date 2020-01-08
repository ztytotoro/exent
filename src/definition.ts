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

export function pos(x: number, y: number) {
    return {
        x,
        y,
    };
}
