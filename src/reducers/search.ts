import { SearchResult, SearchResults, GroupId } from '../types';
import { SearchAction } from '../actions/search';
import { TOpticonAction } from '../actions/turkopticon';
import { MarkAction } from '../actions/markAsRead';
import {
  SEARCH_SUCCESS,
  MARK_ALL_HITS_AS_READ,
  MARK_HIT_AS_READ,
  FETCH_TURKOPTICON_SUCCESS
} from '../constants';
import { Map } from 'immutable';
import {
  updateTurkopticon,
  resultsThatAppearInBoth,
  conflictsUseOldMarkedAsReadProp
} from '../utils/search';
import { noTurkopticon } from '../utils/turkopticon';
// import sampleHits from '../utils/sampleHits';

const initial: SearchResults = Map<GroupId, SearchResult>();

type SearchResultAction = SearchAction | MarkAction | TOpticonAction;

export default (state = initial, action: SearchResultAction): SearchResults => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return (state.filter(
        resultsThatAppearInBoth(action)
      ) as SearchResults).mergeWith(
        conflictsUseOldMarkedAsReadProp,
        action.data
      );
    case FETCH_TURKOPTICON_SUCCESS:
      return state.merge(state
        .filter(noTurkopticon)
        .map(updateTurkopticon(action.data)) as SearchResults);
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
