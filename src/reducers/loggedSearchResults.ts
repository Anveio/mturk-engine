import { SearchResult, SearchResults } from '../types';
import { SEND_NOTIFICATION } from '../constants';
import { Map } from 'immutable';
import { SendNotification } from '../actions/notifications';

const initial: SearchResults = Map<string, SearchResult>();

export default (state = initial, action: SendNotification): SearchResults => {
  switch (action.type) {
    case SEND_NOTIFICATION:
      return state.set(action.hit.groupId, action.hit);
    default:
      return state;
  }
};
