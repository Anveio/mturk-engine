import { combineReducers } from 'redux';
import { default as hits } from './reducers/hits';

export const rootReducer = combineReducers<RootState>({
  hits
});
