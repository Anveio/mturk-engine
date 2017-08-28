import { SearchItem, BlockedHit } from '../types';

export const blockedHitFactory = (item: SearchItem): BlockedHit => {
  return Object.assign(item, { dateBlocked: new Date() });
};
