import { HitSet } from '../types';
import { HitPageAction } from '../actions/hits';
import { FETCH_HIT_PAGE_SUCCESS } from '../constants';
import { Set } from 'immutable';
import sampleHits from '../utils/sampleHits';

const initial: HitSet = Set(sampleHits);

export default (state = initial, action: HitPageAction): HitSet => {
  let partialState: HitSet | undefined;

  switch (action.type) {
    case FETCH_HIT_PAGE_SUCCESS:
      partialState = action.data;
      break;
    default:
      return state;
  }
  return state.union(partialState);
};
