import { Observable } from 'rxjs';
import { EventType } from './event';
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
export declare function getEvent(type: EventType.Drag, timeInterval: number): Observable<IDragEvent>;
export declare function getEvent(type: EventType, timeInterval?: number): Observable<IMouseEvent>;
export declare function getDragEvent(timeInterval?: number): Observable<IDragEvent>;
export declare function draggable(target: HTMLElement, timeInterval?: number): void;
export {};
