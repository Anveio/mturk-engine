import { RootState } from './types';

import { combineReducers } from 'redux';
import { default as hits } from './reducers/hits';
import { default as requesters } from './reducers/requesters';
import { default as searchOptions } from './reducers/searchOptions';

export const rootReducer = combineReducers<RootState>({
  hits,
  requesters,
  searchOptions
});
