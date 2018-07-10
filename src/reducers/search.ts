import { SearchResult, SearchResults, GroupId } from '../types';
import { SearchAction } from '../actions/search';
import { TOpticonAction } from '../actions/turkopticon';
import { SEARCH_SUCCESS, FETCH_TURKOPTICON_SUCCESS } from '../constants';
import { Map } from 'immutable';
import {
  updateTurkopticon,
  resultsThatAppearInBoth,
  conflictsUseOldRequesterData
} from '../utils/search';
import { noTurkopticon } from '../utils/turkopticon';

const initial: SearchResults = Map<GroupId, SearchResult>();

type SearchResultAction = SearchAction | TOpticonAction;

export default (state = initial, action: SearchResultAction): SearchResults => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return (state.filter(
        resultsThatAppearInBoth(action)
      ) as SearchResults).mergeWith(
        conflictsUseOldRequesterData,
        action.data
      );
    case FETCH_TURKOPTICON_SUCCESS:
      return state.merge(state
        .filter(noTurkopticon)
        .map(updateTurkopticon(action.data)) as SearchResults);
    default:
      return state;
  }
};
