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

export const isPaidOrApproved = (el: HitDatabaseEntry) =>
  el.status === 'Paid' ||
  el.status === 'Pending Payment' ||
  el.status === 'Approved';

export const isPending = (el: HitDatabaseEntry) =>
  el.status === 'Pending Approval' ||
  el.status === 'Pending' ||
  el.status === 'Approved' ||
  el.status === 'Pending Payment';

export const isApprovedButNotPaid = (el: HitDatabaseEntry) =>
  el.status === 'Pending Approval' || el.status === 'Approved';

export const calculateAcceptanceRate = (total: number, rejected: number) =>
  (total - rejected) / total * 100;

export const calculateThreshold = (total: number, minimumRate: number) =>
  Math.ceil((minimumRate * total / 100 - total) * -1);

export const rewardAndBonus = (hit: HitDatabaseEntry) =>
  hit.reward + (hit.bonus || 0);
