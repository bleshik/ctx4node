[![Build Status](https://travis-ci.org/bleshik/ctx4node.svg?branch=master)](https://travis-ci.org/bleshik/ctx4node)
# ctx4node
This is the easiest way to keep a context throughout all your nested promises and callbacks.

## How to use it
Easy, just run a piece of code in a new context using context.runWithNew, then use context.set and context.get to put any value into the context. For example:
```
context.runWithNew(() => {
    console.log(context.get('user')); // undefined
    context.set('user', 'Alexey Balchunas');
    console.log(context.get('user')); // Alexey Balchunas
    new Promise((resolve, reject) => {
        console.log(context.get('user')); // Alexey Balchunas
    });
});
```

## Why is it using node's Domain? Isn't it deprecated?
Yup, it is deprecated. However the problem is that there is no built-in replacement for that.
The good thing is that it is just an implementation detail which you may ignore.
If someday the Domain part of nodejs is removed, you always can implement the Context interface.
Also, when it happens, we will provide the updated version as soon as possible.
