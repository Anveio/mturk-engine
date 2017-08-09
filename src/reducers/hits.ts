import { Hit, HitSet } from '../types';
import { HitPageAction } from '../actions/hits';
import { TOpticonAction } from '../actions/turkopticon';
import { FETCH_HIT_PAGE_SUCCESS, FETCH_TURKOPTICON_SUCCESS } from '../constants';
import { Set } from 'immutable';
// import sampleHits from '../utils/sampleHits';

const initial: HitSet = Set<Hit>([]);

type FetchAction = HitPageAction | TOpticonAction;

export default (state = initial, action: FetchAction): HitSet => {
  let partialState: HitSet | undefined;

  switch (action.type) {
    case FETCH_HIT_PAGE_SUCCESS:
      partialState = action.data;
      break;
    case FETCH_TURKOPTICON_SUCCESS:
      partialState = state
        .map((hit: Hit): Hit => ({
          ...hit,
          ...{ turkopticon: action.data.get(hit.requesterId) || hit.turkopticon }
        }))
        .toSet();
      break;
    default:
      return state;
  }
  return state.merge(partialState);
};
