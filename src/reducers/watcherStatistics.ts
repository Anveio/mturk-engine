import { WatcherStatistics, WatcherStatisticsMap } from '../types';
import { AcceptHitSuccess, AcceptHitFailure } from '../actions/accept';
import { ACCEPT_HIT_SUCCESS, ACCEPT_HIT_FAILURE } from '../constants';
import { Map } from 'immutable';
import { defaultWatcherStats } from '../utils/watchers';

const initial: WatcherStatisticsMap = Map<string, WatcherStatistics>();

type WatcherStatisticsAction = AcceptHitFailure | AcceptHitSuccess;

export default (
  state = initial,
  action: WatcherStatisticsAction
): WatcherStatisticsMap => {
  if (!action.fromWatcher) {
    return state;
  }

  switch (action.type) {
    case ACCEPT_HIT_SUCCESS:
      return state.update(action.groupId, defaultWatcherStats, prevStats => ({
        ...prevStats,
        successes: prevStats.successes + 1
      }));
    case ACCEPT_HIT_FAILURE:
      return state.update(action.groupId, defaultWatcherStats, prevStats => ({
        ...prevStats,
        failures: prevStats.failures + 1
      }));
    default:
      return state;
  }
};
