import { TOpticonData, TurkopticonMap } from '../types';
import { TOpticonAction } from '../actions/turkopticon';
import { FETCH_TURKOPTICON_SUCCESS } from '../constants';
import { Map } from 'immutable';

// import sampleRequesters from '../utils/sampleRequesters';

const initial: TurkopticonMap = Map<string, TOpticonData>();

export default (state = initial, action: TOpticonAction): TurkopticonMap => {
  let partialState: TurkopticonMap | undefined;

  switch (action.type) {
    case FETCH_TURKOPTICON_SUCCESS:
      partialState = action.data;
      break;
    default:
      return state;
  }
  return state.merge(partialState);
};
