import { filter } from 'rxjs/operators';
import { EventType, getEvent } from './event';

export function draggable(target: HTMLElement, timeInterval = 20) {
    if (target.parentElement) {
        target.parentElement.style.position = 'relative';
    }

    target.style.top = target.offsetTop + 'px';
    target.style.left = target.offsetLeft + 'px';
    target.style.width = target.clientWidth + 'px';
    target.style.height = target.clientHeight + 'px';
    target.style.position = 'absolute';
    // target.style.transition = `top ${timeInterval}ms, left ${timeInterval}ms`;
    target.draggable = false;
    // prevent default drag event since it will terminate mousemove event
    target.onmousedown = ev => ev.preventDefault();

    getEvent(EventType.Drag, timeInterval)
        .pipe(filter(e => e.target === target))
        .subscribe(e => {
            target.style.top = target.offsetTop + e.offsetY + 'px';
            target.style.left = target.offsetLeft + e.offsetX + 'px';
        });
}
