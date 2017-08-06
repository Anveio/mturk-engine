import { HitPageAction } from '../actions/data';
import { FETCH_HIT_PAGE_SUCCESS } from '../constants';

import { sampleData } from '../utils/sampleData';

const initial: HitTableEntry[] = sampleData;

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
