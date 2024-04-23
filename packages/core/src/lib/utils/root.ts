
let root: Window & typeof globalThis;

if (typeof window !== 'undefined') {
    root = window;
}
else if (typeof global !== 'undefined') {
    root = global as Window & typeof globalThis;
}
else if (typeof self !== 'undefined') {
    root = self;
}

export { root };
