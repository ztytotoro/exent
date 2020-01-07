export declare function pos(x: number, y: number): {
    x: number;
    y: number;
};
export declare function collectEvent(interval?: number): {
    mousemove: import("rxjs").Observable<{
        target: EventTarget | null;
        x: number;
        y: number;
    }>;
    mousedown: import("rxjs").Observable<{
        target: EventTarget | null;
        x: number;
        y: number;
    }>;
    mouseup: import("rxjs").Observable<{
        target: EventTarget | null;
        x: number;
        y: number;
    }>;
    drag: import("rxjs").Observable<{
        offsetX: number;
        offsetY: number;
    }>;
};
