import { fromEvent, merge, Observable } from 'rxjs';
import { map, throttleTime, tap, filter } from 'rxjs/operators';
import { EventType } from './event';
import { eventMap } from './mouse';

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

export function pos(x: number, y: number) {
  return {
    x,
    y
  };
}

let drag!: Observable<IDragEvent>;
let mousedown!: Observable<IMouseEvent>;
let mouseup!: Observable<IMouseEvent>;
let dragend!: Observable<IMouseEvent>;

export function collectEvent(interval = 5) {
  const rawDrag = fromEvent<DragEvent>(window, EventType.Drag).pipe(
    throttleTime(interval),
    map(
      e =>
        ({
          ...pos(e.clientX, e.clientY),
          target: e.target
        } as IMouseEvent)
    )
  );
  const mousemove = fromEvent<MouseEvent>(window, EventType.MouseMove).pipe(
    throttleTime(interval),
    map(
      e =>
        ({
          ...pos(e.clientX, e.clientY),
          target: e.target
        } as IMouseEvent)
    )
  );
  const move = merge(rawDrag, mousemove).pipe(throttleTime(interval));
  mousedown = fromEvent<MouseEvent>(window, EventType.MouseDown).pipe(
    map(
      e =>
        ({
          ...pos(e.clientX, e.clientY),
          target: e.target
        } as IMouseEvent)
    )
  );
  dragend = fromEvent<MouseEvent>(window, EventType.DragEnd).pipe(
    map(
      e =>
        ({
          ...pos(e.clientX, e.clientY),
          target: e.target
        } as IMouseEvent)
    )
  );
  mouseup = fromEvent<MouseEvent>(window, EventType.MouseUp).pipe(
    map(
      e =>
        ({
          ...pos(e.clientX, e.clientY),
          target: e.target
        } as IMouseEvent)
    )
  );
  drag = mousemove.pipe(
    eventMap(
      mousedown,
      (before, current, initial) =>
        ({
          x: current.x,
          y: current.y,
          offsetX: current.x - before.x,
          offsetY: current.y - before.y,
          distanceX: current.x - initial.x,
          distanceY: current.y - initial.y,
          target: initial.target
        } as IDragEvent),
      mouseup
    )
  );
  return {
    mousemove,
    mousedown,
    mouseup,
    drag
  };
}

export function draggable(target: HTMLElement) {
  if (target.parentElement) {
    target.parentElement.style.position = 'relative';
  }

  target.style.top = target.offsetTop + 'px';
  target.style.left = target.offsetLeft + 'px';
  target.style.width = target.clientWidth + 'px';
  target.style.height = target.clientHeight + 'px';
  target.style.position = 'absolute';
  target.draggable = false;

  drag.pipe(filter(e => e.target === target)).subscribe(e => {
    target.style.top = target.offsetTop + e.offsetY + 'px';
    target.style.left = target.offsetLeft + e.offsetX + 'px';
  });
}
