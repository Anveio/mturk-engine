import { RootState } from './types';
import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import { default as tab } from './reducers/tab';
import { default as searchingActive } from './reducers/searchingActive';
import { default as search } from './reducers/search';
import { default as queue } from './reducers/queue';
import { default as watchers } from './reducers/watchers';
import { default as requesters } from './reducers/requesters';
import { default as searchOptions } from './reducers/searchOptions';
import { default as sortingOption } from './reducers/sortingOption';
import { default as hitBlocklist } from './reducers/hitBlocklist';
import { default as timeNextSearch } from './reducers/timeNextSearch';
import { default as waitingForMturk } from './reducers/waitingForMturk';
import { default as topticonSettings } from './reducers/topticonSettings';
import { default as requesterBlocklist } from './reducers/requesterBlocklist';
import { default as audioSettingsV1 } from './reducers/audioSettings';

export const rootReducer = combineReducers<RootState>({
  tab,
  queue,
  search,
  toastr,
  watchers,
  requesters,
  hitBlocklist,
  searchOptions,
  sortingOption,
  timeNextSearch,
  audioSettingsV1,
  waitingForMturk,
  searchingActive,
  topticonSettings,
  requesterBlocklist
});
