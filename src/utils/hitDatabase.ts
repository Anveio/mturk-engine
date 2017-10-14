import { HitDatabaseEntry } from '../types';

export const conflictsPreserveBonus = (
  oldEntry: HitDatabaseEntry,
  newEntry: HitDatabaseEntry
): HitDatabaseEntry => {
  return {
    ...newEntry,
    bonus: oldEntry.bonus
  };
};

export const keepPaidOrApproved = (el: HitDatabaseEntry) =>
  el.status === 'Paid' || el.status === 'Pending Payment';

export const keepPending = (el: HitDatabaseEntry) =>
  el.status === 'Pending Approval';

export const calculateAcceptanceRate = (total: number, rejected: number) =>
  (total - rejected) / total * 100;

export const calculateThreshold = (total: number, minimumRate: number) =>
  Math.ceil((minimumRate * total / 100 - total) * -1);

export const rewardAndBonus = (hit: HitDatabaseEntry) =>
  hit.reward + (hit.bonus || 0);
