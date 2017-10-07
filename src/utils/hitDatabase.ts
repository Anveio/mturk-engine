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

export const keepPending = (el: HitDatabaseEntry) => el.status === 'Pending Approval';

export const calculateAcceptanceRate = (
  total: number,
  rejected: number
): number => {
  return (total - rejected) / total * 100;
};
