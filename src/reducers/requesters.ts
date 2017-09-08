import { Requester, RequesterMap } from '../types';
import { TOpticonAction } from '../actions/turkopticon';
import { FETCH_TURKOPTICON_SUCCESS } from '../constants';
import { Map } from 'immutable';
import { requesterMapFromTO } from '../utils/turkopticon';

// import sampleRequesters from '../utils/sampleRequesters';

const initial: RequesterMap = Map<string, Requester>();

export default (state = initial, action: TOpticonAction): RequesterMap => {
  switch (action.type) {
    case FETCH_TURKOPTICON_SUCCESS:
      return state.merge(requesterMapFromTO(action.data));
    default:
      return state;
  }
};
