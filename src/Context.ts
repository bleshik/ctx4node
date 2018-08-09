export interface Context {
    set: (key: string, value: any) => void;
    get: (key: string) => any;
    bind: (fn: Function) => Function;
    run: (fn: Function) => void;
    runWithNew: (fn: Function) => void;
}
