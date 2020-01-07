import { Observable, OperatorFunction } from 'rxjs';
import { switchMap, map, endWith, takeUntil } from 'rxjs/operators';

export function offset<T, R>(
    start: Observable<T>,
    project: (initial: T, current: T) => R,
    end?: Observable<any>
): OperatorFunction<T, R> {
    return source => {
        let target = start.pipe(
            switchMap(initial => {
                return source.pipe(map(x => project(initial, x)));
            })
        );
        if (end) {
            target = target.pipe(takeUntil(end));
        }
        return target;
    };
}
