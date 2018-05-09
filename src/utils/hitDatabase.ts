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

enum Status {
  SUBMITTED = 'Submitted',
  PENDING_PAYMENT = 'Pending Payment',
  PENDING_APPROVAL = 'Pending Approval',
  APROVED = 'Approved',
  PAID = 'Paid',
  REJECTED = 'Rejected'
}

const paidOrApprovedStatuses = new Set<HitStatus>([
  Status.PAID,
  Status.PENDING_PAYMENT,
  Status.APROVED
]);

const pendingStatuses = new Set<HitStatus>([
  Status.PENDING_APPROVAL,
  Status.PENDING_PAYMENT,
  Status.SUBMITTED,
  Status.APROVED
]);

const approvedButNotPaidStatuses = new Set<HitStatus>([
  Status.PENDING_APPROVAL,
  Status.APROVED
]);

export const isPaidOrApproved = (el: HitDatabaseEntry) =>
  paidOrApprovedStatuses.has(el.status);

export const isPending = (el: HitDatabaseEntry) =>
  pendingStatuses.has(el.status);

export const isApprovedButNotPaid = (el: HitDatabaseEntry) =>
  approvedButNotPaidStatuses.has(el.status);

export const isNotRejected = (el: HitDatabaseEntry) =>
  el.status !== Status.REJECTED;

export const calculateAcceptanceRate = (total: number, rejected: number) =>
  (total - rejected) / total * 100;

export const calculateThreshold = (total: number, minimumRate: number) =>
  Math.ceil((minimumRate * total / 100 - total) * -1);

export const rewardAndBonus = (hit: HitDatabaseEntry) =>
  hit.reward + (hit.bonus || 0);
