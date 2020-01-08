import { Observable, OperatorFunction } from 'rxjs';
export declare function eventMap<T, R>(start: Observable<any>, project: (before: T, current: T, initial: T) => R, end: Observable<any>): OperatorFunction<T, R>;
