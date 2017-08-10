import { Requester, RequesterMap } from '../types';
import { TOpticonAction } from '../actions/turkopticon';
import { FETCH_TURKOPTICON_SUCCESS } from '../constants';
import { Map } from 'immutable';

import sampleRequesters from '../utils/sampleRequesters';

const initial: RequesterMap = Map<string, Requester>(sampleRequesters);

export default (state = initial, action: TOpticonAction): RequesterMap => {
  let partialState: RequesterMap | undefined;

  switch (action.type) {
    case FETCH_TURKOPTICON_SUCCESS:
      partialState = action.data;
      break;
    default:
      return state;
  }
  return state.merge(partialState);
};
