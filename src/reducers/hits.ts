import { SearchItem, SearchMap } from '../types';
import { HitPageAction } from '../actions/hits';
import { TOpticonAction } from '../actions/turkopticon';
import { FETCH_HIT_PAGE_SUCCESS, FETCH_TURKOPTICON_SUCCESS } from '../constants';
import { Map } from 'immutable';
import { invalidGroupId } from '../utils/turkopticon';
// import sampleHits from '../utils/sampleHits';

const initial: SearchMap = Map<string, SearchItem>();

type FetchAction = HitPageAction | TOpticonAction;

export default (state = initial, action: FetchAction): SearchMap => {
  let partialState: SearchMap | undefined;

  switch (action.type) {
    case FETCH_HIT_PAGE_SUCCESS:
      partialState = action.data.filter(invalidGroupId) as SearchMap;
      break;
    case FETCH_TURKOPTICON_SUCCESS:
      partialState = state.filter(invalidGroupId).map((hit: SearchItem): SearchItem => ({
        ...hit,
        turkopticon: action.data.get(hit.requesterId)
      })) as SearchMap;
      break;
    default:
      return state;
  }
  return partialState;
};
