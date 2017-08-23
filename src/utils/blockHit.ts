import { SearchItem, BlockedHit } from '../types';

export const searchItemToBlockedHit = (item: SearchItem): BlockedHit => {
  return Object.assign(item, { dateBlocked: new Date() });
};
