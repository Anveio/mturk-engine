import { Requester } from '../types';
import { TOpticonAction } from '../actions/turkopticon';
import { FETCH_TURKOPTICON_SUCCESS } from '../constants';
import { Map } from 'immutable';

const initial: Map<string, Requester> = Map<string, Requester>();

export default (
  state = initial,
  action: TOpticonAction
): Map<string, Requester> => {
  let partialState: Map<string, Requester> | undefined;

  switch (action.type) {
    case FETCH_TURKOPTICON_SUCCESS:
      partialState = action.data;
      break;
    default:
      return state;
  }
  return state.merge(partialState);
};
