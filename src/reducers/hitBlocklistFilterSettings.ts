import {
  UPDATE_HIT_BLOCKLIST_SEARCH_TERM,
  HIT_BLOCKLIST_TOGGLE_VISIBILITY
} from '../constants';
import { HitBlocklistFilterSettings } from 'types';
import { UpdateHitBlocklistSettings } from 'actions/blockHit';

const initial: HitBlocklistFilterSettings = {
  shouldRender: false,
  searchTerm: '',
  sortOrder: 'DATE_RECENT_FIRST'
};

export default (
  state = initial,
  action: UpdateHitBlocklistSettings
): typeof state => {
  switch (action.type) {
    case UPDATE_HIT_BLOCKLIST_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.data
      };
    case HIT_BLOCKLIST_TOGGLE_VISIBILITY:
      return {
        ...state,
        shouldRender: !state.shouldRender
      };
    default:
      return state;
  }
};
