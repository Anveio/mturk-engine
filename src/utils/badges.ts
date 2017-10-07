import { TOpticonData, RequesterScores, HitStatus } from '../types';
import { BadgeDescriptor } from '@shopify/polaris/types/components/ResourceList/Item';
import { calculateAverageScore } from './turkopticon';
import { Status } from '@shopify/polaris/types/components/Badge/Badge';
// import { BadgeProps } from '@shopify/polaris';

const noTOBadge: BadgeDescriptor = {
  content: 'No T.O.',
  status: '' as Status
};

export const generateTOpticonBadge = (
  turkopticon?: TOpticonData
): BadgeDescriptor[] => {
  if (!turkopticon) {
    return [ noTOBadge ];
  }

  return [ calculateScoreBadge(turkopticon.attrs) ];
};

export const calculateScoreBadge = (
  scores: RequesterScores
): BadgeDescriptor => {
  const average = calculateAverageScore(scores);
  const status = assignScoreColor(average) as Status;

  return {
    status,
    content: generateContentString(average)
  };
};

const generateContentString = (average: number | null) => {
  return !average ? 'No T.O.' : `${average.toFixed(2)} T.O.`;
};

const assignScoreColor = (score: number | null): Status | null => {
  if (score === null) {
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
    case 'Pending Payment':
      return { content: 'Approved', status: 'success' };
    case 'Rejected':
      return { content: 'Rejected', status: 'warning' };
    case 'Pending Approval':
      return { content: 'Pending', status: 'attention' };
    default:
      return { content: 'Pending', status: 'attention' };
  }
};
