import { UPDATE_HIT_BLOCKLIST_SEARCH_TERM } from '../constants';
import { HitBlocklistFilterSettings } from 'types';
import { UpdateHitBlocklistSearchTerm } from 'actions/blockHit';

const initial: HitBlocklistFilterSettings = {
  searchTerm: '',
  sortOrder: 'DATE_RECENT_FIRST'
};

export default (
  state = initial,
  action: UpdateHitBlocklistSearchTerm
): typeof state => {
  switch (action.type) {
    case UPDATE_HIT_BLOCKLIST_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.data
      };
    default:
      return state;
  }
};
