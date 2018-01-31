import { SearchResult, SearchResults } from '../types';
import { SearchSuccess } from '../actions/search';
import { SEARCH_SUCCESS } from '../constants';
import { Map } from 'immutable';
import { conflictsUseOldMarkedAsReadProp } from '../utils/search';

const initial: SearchResults = Map<string, SearchResult>();

export default (state = initial, action: SearchSuccess): SearchResults => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return state.mergeWith(conflictsUseOldMarkedAsReadProp, action.data);
    default:
      return state;
  }
};
