import { Hit, HitMap } from '../types';
import { HitPageAction } from '../actions/hits';
import { TOpticonAction } from '../actions/turkopticon';
import { FETCH_HIT_PAGE_SUCCESS, FETCH_TURKOPTICON_SUCCESS } from '../constants';
import { Map } from 'immutable';
import { invalidGroupId } from '../utils/turkopticon';
// import sampleHits from '../utils/sampleHits';

const initial: HitMap = Map<string, Hit>();

type FetchAction = HitPageAction | TOpticonAction;

export default (state = initial, action: FetchAction): HitMap => {
  let partialState: HitMap | undefined;

  switch (action.type) {
    case FETCH_HIT_PAGE_SUCCESS:
      partialState = action.data.filter(invalidGroupId) as HitMap;
      break;
    case FETCH_TURKOPTICON_SUCCESS:
      partialState = state.filter(invalidGroupId).map((hit: Hit): Hit => ({
        ...hit,
        turkopticon: action.data.get(hit.requesterId)
      })) as HitMap;
      break;
    default:
      return state;
  }
  return partialState;
};
