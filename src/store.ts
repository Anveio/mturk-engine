import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { autoRehydrate, persistStore } from 'redux-persist';
import { rootReducer } from './reducers';
import rootSaga from './sagas';
import { config } from './config';

const sagaMiddleware = createSagaMiddleware();

const store = createStore<any>(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware), autoRehydrate(), config.devtools)
);

sagaMiddleware.run(rootSaga);

persistStore(
  store,
  config.reduxPersistSettings,
  config.reduxPersistErrorCallback
);

export default store;
