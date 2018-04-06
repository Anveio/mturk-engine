import { RootState } from './types';
import { combineReducers } from 'redux';
import { default as tab } from './reducers/tab';
import { default as searchingActive } from './reducers/searchingActive';
import { default as account } from './reducers/account';
import { default as search } from './reducers/search';
import { default as queue } from './reducers/queue';
import { default as watchers } from './reducers/watchers';
import { default as searchOptions } from './reducers/searchOptions';
import { default as sortingOption } from './reducers/sortingOption';
import { default as hitBlocklist } from './reducers/hitBlocklist';
import { default as timeNextSearch } from './reducers/timeNextSearch';
import { default as waitingForMturk } from './reducers/waitingForMturk';
import { default as topticonSettings } from './reducers/topticonSettings';
import { default as requesterBlocklist } from './reducers/requesterBlocklist';
import { default as audioSettingsV1 } from './reducers/audioSettings';
import { default as selectedHitDbDate } from './reducers/selectedHitDbDate';
import { default as hitDatabase } from './reducers/hitDatabase';
import { default as dailyEarningsGoal } from './reducers/dailyEarningsGoal';
import { default as waitingForHitDbRefresh } from './reducers/waitingForHitDbRefresh';
import { default as watcherTimes } from './reducers/watcherTimes';
import { default as uploadedState } from './reducers/uploadedState';
import { default as expandedSearchResults } from './reducers/expandedSearchResults';
import { default as notificationSettings } from './reducers/notificationSettings';
import { default as loggedSearchResults } from './reducers/loggedSearchResults';
import { default as watcherTreeSettings } from './reducers/watcherTreeSettings';
import { default as watcherFolders } from './reducers/watcherFolders';
import { default as watcherStatistics } from './reducers/watcherStatistics';
import { default as expandedWatcherFolderIds } from './reducers/expandedWatcherFolderIds';
import { default as expandedQueueItems } from './reducers/expandedQueueItems';
import { default as searchAudioEnabled } from './reducers/searchAudioEnabled';

export const rootReducer = combineReducers<RootState>({
  tab,
  queue,
  search,
  account,
  watchers,
  hitDatabase,
  hitBlocklist,
  watcherTimes,
  searchOptions,
  sortingOption,
  uploadedState,
  watcherFolders,
  timeNextSearch,
  audioSettingsV1,
  waitingForMturk,
  searchingActive,
  topticonSettings,
  watcherStatistics,
  dailyEarningsGoal,
  selectedHitDbDate,
  requesterBlocklist,
  searchAudioEnabled,
  expandedQueueItems,
  watcherTreeSettings,
  loggedSearchResults,
  notificationSettings,
  expandedSearchResults,
  waitingForHitDbRefresh,
  expandedWatcherFolderIds
});
