import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { autoRehydrate, createTransform, persistStore } from 'redux-persist';
// import * as localForage from 'localforage';
// import { fromJS } from 'immutable';
// import { HitBlockMap } from './types';
import { rootReducer } from './reducers';
import rootSaga from './sagas';

// tslint:disable:no-any
// tslint:disable:no-string-literal
const devtools: any = window['__REDUX_DEVTOOLS_EXTENSION__']
  ? window['__REDUX_DEVTOOLS_EXTENSION__']()
  : (f: any) => f;

const sagaMiddleware = createSagaMiddleware();

const store = createStore<any>(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware), devtools)
);

sagaMiddleware.run(rootSaga);

// const immutableTransform = createTransform<HitBlockMap, any>(
//   (inboundState: HitBlockMap, key: string) => {
//     console.log(inboundState, `key inbound: ${key}`);
//     return inboundState.toJS();
//   },
//   (outboundState: HitBlockMap, key: string) => {
//     console.log(fromJS(outboundState), `key outbound: ${key}`);
//     return fromJS(outboundState);
//   },
//   { whitelist: [ 'hitBlocklist' ] }
// );

// persistStore(store, {
//   whitelist: [ 'hitBlocklist' ],
//   storage: localForage,
//   transforms: [ immutableTransform ]
// });

export default store;
