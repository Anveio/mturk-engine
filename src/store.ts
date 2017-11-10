import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as immutableTransform from 'redux-persist-transform-immutable';
import { autoRehydrate, persistStore } from 'redux-persist';
import * as localForage from 'localforage';
import { rootReducer } from './reducers';
import rootSaga from './sagas';
import {
  PERSISTED_SETTINGS_WHITELIST,
  IMMUTABLE_PERSISTED_SETTINGS_WHITELIST
} from './constants/settings';

// tslint:disable:no-any
// tslint:disable:no-string-literal
const devtools: any = window['__REDUX_DEVTOOLS_EXTENSION__']
  ? window['__REDUX_DEVTOOLS_EXTENSION__']()
  : (f: any) => f;

const sagaMiddleware = createSagaMiddleware();

const store = createStore<any>(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware), autoRehydrate(), devtools)
);

sagaMiddleware.run(rootSaga);

persistStore(
  store,
  {
    whitelist: PERSISTED_SETTINGS_WHITELIST,
    storage: localForage,
    transforms: [
      immutableTransform({
        whitelist: IMMUTABLE_PERSISTED_SETTINGS_WHITELIST
      })
    ]
  },
  err =>
    err
      ? console.warn(
          `There was an issue retrieving your Mturk Engine settings. Error Log: ` +
            err
        )
      : undefined
);

export default store;
