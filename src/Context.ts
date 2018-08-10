export type AnyFun = (...args: any[]) => any;

export interface Context {
    set: (key: string, value: any) => void;
    get: (key: string) => any;
    bind<T extends AnyFun>(fn: T): T;
    bindWithNew<T extends AnyFun>(fn: T): T;
    run: (fn: Function) => void;
    runWithNew: (fn: Function) => void;
}
