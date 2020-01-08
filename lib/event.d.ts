import { Observable } from 'rxjs';
import { IDragEvent, IMouseEvent } from './definition';
export declare enum EventType {
    MouseMove = "MouseMove",
    MouseDown = "MouseDown",
    MouseUp = "MouseUp",
    Drag = "Drag"
}
export declare function getEvent(type: EventType.Drag, timeInterval: number): Observable<IDragEvent>;
export declare function getEvent(type: EventType, timeInterval?: number): Observable<IMouseEvent>;
export declare function getDragEvent(timeInterval?: number): Observable<IDragEvent>;
