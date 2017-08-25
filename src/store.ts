// import { RootState } from './types';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
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

export default store;
