import { RootState } from './types';

import { combineReducers } from 'redux';
import { default as tab } from './reducers/tab';
import { default as hits } from './reducers/hits';
import { default as queue } from './reducers/queue';
import { default as requesters } from './reducers/requesters';
import { default as searchOptions } from './reducers/searchOptions';
import { default as searchFormActive } from './reducers/searchFormActive';

export const rootReducer = combineReducers<RootState>({
  tab,
  hits,
  queue,
  requesters,
  searchOptions,
  searchFormActive
});
