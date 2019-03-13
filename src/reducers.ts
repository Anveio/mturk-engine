import { RootState } from "./types";
import { combineReducers } from "redux";
import tab from "./reducers/tab";
import searchingActive from "./reducers/searchingActive";
import account from "./reducers/account";
import search from "./reducers/search";
import queue from "./reducers/queue";
import watchers from "./reducers/watchers";
import searchOptions from "./reducers/searchOptions";
import sortingOption from "./reducers/sortingOption";
import hitBlocklist from "./reducers/hitBlocklist";
import timeNextSearch from "./reducers/timeNextSearch";
import waitingForMturk from "./reducers/waitingForMturk";
import topticonSettings from "./reducers/topticonSettings";
import requesterBlocklist from "./reducers/requesterBlocklist";
import audioSettingsV1 from "./reducers/audioSettings";
import selectedHitDbDate from "./reducers/selectedHitDbDate";
import hitDatabase from "./reducers/hitDatabase";
import dailyEarningsGoal from "./reducers/dailyEarningsGoal";
import waitingForHitDbRefresh from "./reducers/waitingForHitDbRefresh";
import watcherTimers from "./reducers/watcherTimers";
import uploadedState from "./reducers/uploadedState";
import expandedSearchResults from "./reducers/expandedSearchResults";
import notificationSettings from "./reducers/notificationSettings";
import notifiedSearchResultIds from "./reducers/notifiedSearchResultIds";
import watcherTreeSettings from "./reducers/watcherTreeSettings";
import watcherFolders from "./reducers/watcherFolders";
import watcherStatistics from "./reducers/watcherStatistics";
import expandedWatcherFolderIds from "./reducers/expandedWatcherFolderIds";
import expandedQueueItems from "./reducers/expandedQueueItems";
import searchAudioEnabled from "./reducers/searchAudioEnabled";
import queueSortingOption from "./reducers/queueSortingOption";
import databaseFilterSettings from "./reducers/databaseFilterSettings";
import loggedRequesters from "./reducers/loggedRequesters";
import markedAsReadGroupIds from "./reducers/markedAsReadGroupIds";
import hitBlocklistFilterSettings from "./reducers/hitBlocklistFilterSettings";

export const rootReducer = combineReducers<RootState>({
  tab,
  queue,
  search,
  account,
  watchers,
  hitDatabase,
  hitBlocklist,
  watcherTimers,
  searchOptions,
  sortingOption,
  uploadedState,
  watcherFolders,
  timeNextSearch,
  audioSettingsV1,
  waitingForMturk,
  searchingActive,
  topticonSettings,
  loggedRequesters,
  watcherStatistics,
  dailyEarningsGoal,
  selectedHitDbDate,
  requesterBlocklist,
  queueSortingOption,
  searchAudioEnabled,
  expandedQueueItems,
  watcherTreeSettings,
  markedAsReadGroupIds,
  notificationSettings,
  expandedSearchResults,
  databaseFilterSettings,
  waitingForHitDbRefresh,
  notifiedSearchResultIds,
  expandedWatcherFolderIds,
  hitBlocklistFilterSettings
});
