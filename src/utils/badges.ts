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

interface BadgeDescriptor {
  readonly content: string;
  readonly status: Status;
}

export const generateHitStatusBadge = (status: HitStatus): BadgeDescriptor => {
  switch (status) {
    case 'Paid':
      return { content: 'Paid', status: 'success' };
    case 'Approved':
    case 'Pending Payment':
      return { content: 'Approved', status: 'success' };
    case 'Rejected':
      return { content: 'Rejected', status: 'warning' };
    case 'Submitted':
    case 'Pending Approval':
      return { content: 'Pending', status: 'info' };
    default:
      return { content: 'Pending', status: 'info' };
  }
};
