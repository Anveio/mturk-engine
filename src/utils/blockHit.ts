import { SearchResult, BlockedHit } from '../types';

export const blockedHitFactory = (item: SearchResult): BlockedHit => {
  return Object.assign(item, { dateBlocked: new Date() });
};
