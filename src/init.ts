import { fromEvent } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';
import { EventType } from './event';
import { offset } from './mouse';

export function pos(x: number, y: number) {
    return {
        x,
        y,
    };
}

export function collectEvent(interval = 50) {
    const mousemove = fromEvent<MouseEvent>(window, EventType.MouseMove).pipe(
        throttleTime(interval),
        map(e => ({
            ...pos(e.clientX, e.clientY),
            target: e.target,
        }))
    );
    const mousedown = fromEvent<MouseEvent>(window, EventType.MouseDown).pipe(
        throttleTime(interval),
        map(e => ({
            ...pos(e.clientX, e.clientY),
            target: e.target,
        }))
    );
    const mouseup = fromEvent<MouseEvent>(window, EventType.MouseUp).pipe(
        throttleTime(interval),
        map(e => ({
            ...pos(e.clientX, e.clientY),
            target: e.target,
        }))
    );
    const drag = mousemove.pipe(
        offset(
            mousedown,
            (initial, current) => ({
                offsetX: current.x - initial.x,
                offsetY: current.y - initial.y,
                target: initial.target,
            }),
            mouseup
        )
    );
    return {
        mousemove,
        mousedown,
        mouseup,
        drag,
    };
}
