import { Observable, fromEvent } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';
import { eventMap } from './operators';
import { IDragEvent, IMouseEvent, pos } from './definition';

export enum EventType {
    MouseMove = 'MouseMove',
    MouseDown = 'MouseDown',
    MouseUp = 'MouseUp',
    Drag = 'Drag',
}

const events: {
    [key: string]: any;
} = {};

export function getEvent(
    type: EventType.Drag,
    timeInterval: number
): Observable<IDragEvent>;
export function getEvent(
    type: EventType,
    timeInterval?: number
): Observable<IMouseEvent>;
export function getEvent(
    type: EventType,
    timeInterval?: number
): Observable<IMouseEvent> {
    if (type === EventType.Drag) {
        return getDragEvent(timeInterval) as any;
    }
    if (!events[type]) {
        events[type] = eventInitialize(type);
    }
    return timeInterval
        ? events[type].pipe(throttleTime(timeInterval))
        : events[type];
}

function eventInitialize(type: EventType) {
    switch (type) {
        case EventType.MouseMove:
            return fromEvent<MouseEvent>(window, 'mousemove').pipe(
                map(
                    e =>
                        ({
                            ...pos(e.clientX, e.clientY),
                            target: e.target,
                        } as IMouseEvent)
                )
            );
        case EventType.MouseDown:
            return fromEvent<MouseEvent>(window, 'mousedown').pipe(
                map(
                    e =>
                        ({
                            ...pos(e.clientX, e.clientY),
                            target: e.target,
                        } as IMouseEvent)
                )
            );
        case EventType.MouseUp:
            return fromEvent<MouseEvent>(window, 'mouseup').pipe(
                map(
                    e =>
                        ({
                            ...pos(e.clientX, e.clientY),
                            target: e.target,
                        } as IMouseEvent)
                )
            );
    }
}

export function getDragEvent(timeInterval?: number) {
    return getEvent(EventType.MouseMove, timeInterval).pipe(
        eventMap(
            getEvent(EventType.MouseDown),
            (before, current, initial) =>
                ({
                    x: current.x,
                    y: current.y,
                    offsetX: current.x - before.x,
                    offsetY: current.y - before.y,
                    distanceX: current.x - initial.x,
                    distanceY: current.y - initial.y,
                    target: initial.target,
                } as IDragEvent),
            getEvent(EventType.MouseUp)
        )
    );
}
