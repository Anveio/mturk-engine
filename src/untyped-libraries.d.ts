/**
 * This is here because some libraries do not have type definitions.
 * Not declaring this empty module would cause the TypeScript compiler to throw
 * 'implicit any' errors when attempting to use these packages.
 */

declare module 'redux-persist-transform-immutable';
declare module 'transit-immutable-js';
