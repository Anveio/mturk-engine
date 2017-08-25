import { SearchItem, SearchResults } from '../types';
import { SearchAction } from '../actions/search';
import { TOpticonAction } from '../actions/turkopticon';
import {
  FETCH_HIT_PAGE_SUCCESS,
  FETCH_TURKOPTICON_SUCCESS
} from '../constants';
import { Map } from 'immutable';
// import sampleHits from '../utils/sampleHits';

const initial: SearchResults = Map<string, SearchItem>();

type FetchAction = SearchAction | TOpticonAction;

export default (state = initial, action: FetchAction): SearchResults => {
  let partialState: SearchResults | undefined;

  switch (action.type) {
    case FETCH_HIT_PAGE_SUCCESS:
      partialState = action.data as SearchResults;
      break;
    case FETCH_TURKOPTICON_SUCCESS:
      partialState = state.map((hit: SearchItem): SearchItem => ({
        ...hit,
        turkopticon: action.data.get(hit.requesterId)
      })) as SearchResults;
      break;
    default:
      return state;
  }
  return partialState;
};
