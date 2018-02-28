import * as localForage from 'localforage';
import * as immutableTransform from 'redux-persist-transform-immutable';
import {
  PERSISTED_STATE_WHITELIST,
  IMMUTABLE_PERSISTED_STATE_WHITELIST
} from './constants/settings';
import { compose } from 'redux';

export const config = {
  reduxPersistSettings: {
    whitelist: PERSISTED_STATE_WHITELIST,
    storage: localForage,
    transforms: [
      immutableTransform({
        whitelist: IMMUTABLE_PERSISTED_STATE_WHITELIST
      })
    ]
  },
  reduxPersistErrorCallback: (err?: Error) =>
    err
      ? console.warn(
          `There was an issue retrieving your Mturk Engine settings. Error Log: ` +
            err
        )
      : undefined,
  // tslint:disable:no-string-literal
  devtools: window['__REDUX_DEVTOOLS_EXTENSION__']
    ? window['__REDUX_DEVTOOLS_EXTENSION__']()
    : compose
};
