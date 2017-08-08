import { HitTableEntry } from '../types';

import { HitPageAction } from '../actions/hits';
import { FETCH_HIT_PAGE_SUCCESS } from '../constants';

import sampleHits from '../utils/sampleHits';

const initial: HitTableEntry[] = sampleHits;

export default (state = initial, action: HitPageAction): HitTableEntry[] => {
  let partialState: HitTableEntry[];

  switch (action.type) {
    case FETCH_HIT_PAGE_SUCCESS:
      partialState = action.data;
      break;
    default:
      return state;
  }
  return [ ...partialState, ...state ];
};
