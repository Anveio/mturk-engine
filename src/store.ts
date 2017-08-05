import { createStore, compose } from 'redux';
import { rootReducer } from './reducers';

// tslint:disable:no-any
// tslint:disable:no-string-literal
const devtools: any = window['devToolsExtension']
  ? window['devToolsExtension']
  : (f: any) => f;

const store = createStore<RootState>(rootReducer, compose(devtools()));

export default store;
