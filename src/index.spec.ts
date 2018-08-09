import { context } from './';

it('context works', () => {
    context.runWithNew(() => {
        expect(context.get('user')).toBeFalsy();
        context.set('user', 'Tom Hanks');
        expect(context.get('user')).toEqual('Tom Hanks');
        context.runWithNew(() => {
            expect(context.get('user')).toBeFalsy();
            context.set('user', 'Alexey Balchunas');
            expect(context.get('user')).toEqual('Alexey Balchunas');
            const promise = new Promise((resolve, reject) => {
                resolve(context.get('user'));
            });
            promise.then((u) => {
                expect(u).toEqual('Alexey Balchunas');
            });
            return null;
        });
        expect(context.get('user')).toEqual('Tom Hanks');
    });
});
