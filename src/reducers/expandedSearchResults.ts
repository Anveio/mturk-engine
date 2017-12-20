import { Map } from 'immutable';
import { ExpandedSearchResultsMap } from '../types';
import { ExpandAction } from '../actions/toggleExpand';
import {
  TOGGLE_SEARCH_RESULT_EXPAND,
  COLLAPSE_ALL_SEARCH_RESULTS
} from '../constants';

const initial: ExpandedSearchResultsMap = Map<string, true>();

export default (state = initial, action: ExpandAction) => {
  switch (action.type) {
    case TOGGLE_SEARCH_RESULT_EXPAND:
      return state.get(action.hit.groupId)
        ? state.delete(action.hit.groupId)
        : state.set(action.hit.groupId, true);
    case COLLAPSE_ALL_SEARCH_RESULTS:
      return state.clear();
    default:
      return state;
  }
};
