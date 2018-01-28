import { HitStatus } from '../types';
import { BadgeDescriptor } from '@shopify/polaris/types/components/ResourceList/Item';
import { Status } from '@shopify/polaris/types/components/Badge/Badge';
// import { BadgeProps } from '@shopify/polaris';

const noTOBadge: BadgeDescriptor = {
  content: 'No T.O.',
  status: '' as Status
};

export const generateTOpticonBadge = (
  averageScore: number | null
): BadgeDescriptor[] => {
  if (!averageScore) {
    return [noTOBadge];
  }

  const status = assignScoreColor(averageScore) as Status;
  const content = generateContentString(averageScore);

  return [
    {
      status,
      content
    }
  ];
};

const generateContentString = (average: number | null) => {
  return !average ? 'No T.O.' : `${average.toFixed(2)} T.O.`;
};

const assignScoreColor = (score: number | null): Status | null => {
  if (!score) {
    return null;
  }

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
