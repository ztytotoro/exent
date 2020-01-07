import { Observable, OperatorFunction } from 'rxjs';
export declare function offset<T, R>(start: Observable<T>, project: (initial: T, current: T) => R, end?: Observable<any>): OperatorFunction<T, R>;
