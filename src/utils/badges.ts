import { HitStatus } from '../types';
import { Status } from '@shopify/polaris/types/components/Badge/Badge';

export const assignScoreColor = (score: number): Status => {
  if (score < 2) {
    return 'warning';
  } else if (score < 3) {
    return 'attention';
  } else if (score < 4) {
    return 'info';
  } else {
    return 'success';
  }
};

export const generateHitStatusBadge = (status: HitStatus): Status => {
  switch (status) {
    case 'Paid':
      return 'success';
    case 'Approved':
    case 'Pending Payment':
      return 'success';
    case 'Rejected':
      return 'warning';
    case 'Submitted':
    case 'Pending Approval':
      return 'info';
    default:
      return 'info';
  }
};
