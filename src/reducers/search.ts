import { SearchResult, SearchResults } from '../types';
import { SearchAction } from '../actions/search';
import { TOpticonAction } from '../actions/turkopticon';
import { ToggleSearchResultExpand } from '../actions/toggleExpand';
import {
  SEARCH_SUCCESS,
  FETCH_TURKOPTICON_SUCCESS,
  TOGGLE_SEARCH_RESULT_EXPAND
} from '../constants';
import { Map } from 'immutable';
import {
  updateTurkopticon,
  innerJoinSearchResults,
  conflictsUpdateOnlyIndexes
} from '../utils/search';
// import sampleHits from '../utils/sampleHits';

const initial: SearchResults = Map<string, SearchResult>();

type SearchResultAction =
  | SearchAction
  | TOpticonAction
  | ToggleSearchResultExpand;

export default (state = initial, action: SearchResultAction): SearchResults => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return (state.filter(
        innerJoinSearchResults(action)
      ) as SearchResults).mergeWith(conflictsUpdateOnlyIndexes, action.data);
    case FETCH_TURKOPTICON_SUCCESS:
      return state.map(updateTurkopticon(action)) as SearchResults;
    case TOGGLE_SEARCH_RESULT_EXPAND:
      return state.update(action.hit.groupId, hit => ({
        ...hit,
        expanded: !action.hit.expanded
      }));
    default:
      return state;
  }
};
