import { Observable, OperatorFunction, merge } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

export function eventMap<T, R>(
  start: Observable<any>,
  project: (before: T, current: T, initial: T) => R,
  end: Observable<any>
): OperatorFunction<T, R> {
  return source => {
    let canTake = false;
    let initial: T | null = null;
    let before: T | null = null;
    start.subscribe(() => {
      canTake = true;
    });
    end.subscribe(() => {
      canTake = false;
      initial = null;
      before = null;
    });
    return source.pipe(
      filter(() => canTake),
      tap(value => {
        if (initial === null) {
          initial = value;
        }
      }),
      map(current => {
        const _before = before ?? initial;
        before = current;
        return project(_before as T, current, initial as T);
      })
    );
  };
}
