import { WatcherStatistics, WatcherStatisticsMap } from '../types';
import { AcceptHitSuccess, AcceptHitFailure } from '../actions/accept';
import { ACCEPT_HIT_SUCCESS, ACCEPT_HIT_FAILURE } from '../constants';
import { Map } from 'immutable';

const initial: WatcherStatisticsMap = Map<string, WatcherStatistics>();

const unsetValue: WatcherStatistics = { failures: 0, successes: 0 };

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
      return state.update(action.groupId, unsetValue, statistics => ({
        ...statistics,
        successes: statistics.successes + 1
      }));
    case ACCEPT_HIT_FAILURE:
      return state.update(action.groupId, unsetValue, statistics => ({
        ...statistics,
        failures: statistics.failures + 1
      }));
    default:
      return state;
  }
};
