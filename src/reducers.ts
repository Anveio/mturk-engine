import { RootState } from './types';

import { combineReducers } from 'redux';
import { default as hits } from './reducers/hits';
import { default as requesters } from './reducers/requesters';

export const rootReducer = combineReducers<RootState>({
  hits,
  requesters
});
