declare module 'redux-persist-transform-immutable';
declare module 'transit-immutable-js';

/**
 * This is here because `redux-persist-transform-immutable` does not have type
 * definitions. Not declaring this empty module would cause the TypeScript
 * compiler to throw 'implicit any' errors when attempting to use this package.
 */
