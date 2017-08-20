import { RootState } from './types';

import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import { default as tab } from './reducers/tab';
import { default as search } from './reducers/search';
import { default as queue } from './reducers/queue';
import { default as requesters } from './reducers/requesters';
import { default as searchOptions } from './reducers/searchOptions';
import { default as searchFormActive } from './reducers/searchFormActive';

export const rootReducer = combineReducers<RootState>({
  tab,
  queue,
  search,
  toastr,
  requesters,
  searchOptions,
  searchFormActive
});
