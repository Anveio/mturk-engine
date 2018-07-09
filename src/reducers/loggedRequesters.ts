import { RequesterMap, RequesterId, Requester } from '../types';
import { TOpticonAction } from '../actions/turkopticon';
import { FETCH_TURKOPTICON_SUCCESS } from '../constants';
import { Map } from 'immutable';

const initial: RequesterMap = Map<RequesterId, Requester>();

type SearchResultAction = TOpticonAction;

export default (state = initial, action: SearchResultAction): RequesterMap => {
  switch (action.type) {
    case FETCH_TURKOPTICON_SUCCESS:
      return state.merge(action.data);
    default:
      return state;
  }
};
