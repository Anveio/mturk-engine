import { SearchResult, SearchResults, GroupId } from '../types';
import { SearchAction } from '../actions/search';
import { SEARCH_SUCCESS } from '../constants';
import { Map } from 'immutable';
import { resultsThatAppearInBoth } from '../utils/search';

const initial: SearchResults = Map<GroupId, SearchResult>();

export default (state = initial, action: SearchAction): SearchResults => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return (state.filter(
        resultsThatAppearInBoth(action)
      ) as SearchResults).merge(action.data);
    default:
      return state;
  }
};
