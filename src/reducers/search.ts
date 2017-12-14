import { SearchResult, SearchResults } from '../types';
import { SearchAction } from '../actions/search';
import { TOpticonAction } from '../actions/turkopticon';
import { MarkAction } from '../actions/markAsRead';
import { ExpandAction } from '../actions/toggleExpand';
import {
  SEARCH_SUCCESS,
  MARK_ALL_HITS_AS_READ,
  MARK_HIT_AS_READ,
  FETCH_TURKOPTICON_SUCCESS,
  TOGGLE_SEARCH_RESULT_EXPAND,
  COLLAPSE_ALL_SEARCH_RESULTS
} from '../constants';
import { Map } from 'immutable';
import {
  updateTurkopticon,
  resultsThatAppearInBoth,
  conflictsUseOldExpandedProp,
  rejectInvalidGroupId
} from '../utils/search';
import { noTurkopticon } from '../utils/turkopticon';
// import sampleHits from '../utils/sampleHits';

const initial: SearchResults = Map<string, SearchResult>();

type SearchResultAction =
  | SearchAction
  | MarkAction
  | TOpticonAction
  | ExpandAction;

export default (state = initial, action: SearchResultAction): SearchResults => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return (state.filter(resultsThatAppearInBoth(action)) as SearchResults)
        .mergeWith(conflictsUseOldExpandedProp, action.data)
        .filter(rejectInvalidGroupId) as SearchResults;
    case FETCH_TURKOPTICON_SUCCESS:
      return state.merge(state
        .filter(noTurkopticon)
        .map(updateTurkopticon(action.data)) as SearchResults);
    case TOGGLE_SEARCH_RESULT_EXPAND:
      return state.update(action.hit.groupId, hit => ({
        ...hit,
        expanded: !action.hit.expanded
      }));
    case COLLAPSE_ALL_SEARCH_RESULTS:
      return state.map((hit: SearchResult) => ({
        ...hit,
        expanded: false
      })) as SearchResults;
    case MARK_HIT_AS_READ:
      return state.update(action.groupId, hit => ({
        ...hit,
        markedAsRead: true
      }));
    case MARK_ALL_HITS_AS_READ:
      return state.map((hit: SearchResult) => ({
        ...hit,
        markedAsRead: true
      })) as SearchResults;

    default:
      return state;
  }
};
