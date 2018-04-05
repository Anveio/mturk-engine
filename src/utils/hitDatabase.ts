import { HitDatabaseEntry, HitStatus } from '../types';

export const conflictsPreserveBonus = (
  oldEntry: HitDatabaseEntry,
  newEntry: HitDatabaseEntry
): HitDatabaseEntry => {
  return {
    ...newEntry,
    bonus: oldEntry.bonus
  };
};

const paidOrApprovedStatuses = new Set<HitStatus>([
  'Paid',
  'Pending Payment',
  'Approved'
]);

const pendingStatuses = new Set<HitStatus>([
  'Pending Approval',
  'Pending Payment',
  'Submitted',
  'Approved'
]);

const approvedButNotPaidStatuses = new Set<HitStatus>([
  'Pending Approval',
  'Approved'
]);

export const isPaidOrApproved = (el: HitDatabaseEntry) =>
  paidOrApprovedStatuses.has(el.status);

export const isPending = (el: HitDatabaseEntry) =>
  pendingStatuses.has(el.status);

export const isApprovedButNotPaid = (el: HitDatabaseEntry) =>
  approvedButNotPaidStatuses.has(el.status);

export const calculateAcceptanceRate = (total: number, rejected: number) =>
  (total - rejected) / total * 100;

export const calculateThreshold = (total: number, minimumRate: number) =>
  Math.ceil((minimumRate * total / 100 - total) * -1);

export const rewardAndBonus = (hit: HitDatabaseEntry) =>
  hit.reward + (hit.bonus || 0);
