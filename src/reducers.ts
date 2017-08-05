import { combineReducers } from 'redux';
import { default as data } from './reducers/data';

export const rootReducer = combineReducers<RootState>({
  data
});
