import * as domain from 'domain';
import { AnyFun, Context } from './Context';

function getActiveDomainIfAny() {
    return (domain as any).active;
}

function getActiveDomain() {
    const d = getActiveDomainIfAny();
    if (!d) {
        throw new Error("No active context is found. Please use `context.runWithNew` to create one.")
    }
    return d;
}

const originalThen = Promise.prototype.then;
Promise.prototype.then = function (cb: any, eb: any) {
    if (getActiveDomainIfAny()) {
        if (typeof cb === 'function') {
            cb = getActiveDomain().bind(cb);
        }
        if (typeof eb === 'function') {
            eb = getActiveDomain().bind(eb);
        }
    }
    return originalThen.call(this, cb, eb);
};

export const context: Context = {
    set: (key: string, value: any) => {
        getActiveDomain()[key] = value;
    },
    get: (key: string) => {
        return getActiveDomain()[key];
    },
    bind<T extends AnyFun>(fn: T): T {
        return (getActiveDomainIfAny() || domain.create()).bind(fn);
    },
    run: (fn: Function) => {
        return (getActiveDomainIfAny() || domain.create()).run(fn);
    },
    bindWithNew<T extends AnyFun>(fn: T): T {
        return domain.create().bind(fn);
    },
    runWithNew: (fn: Function) => {
        domain.create().run(fn);
    }
};
