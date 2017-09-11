import { TOpticonData, RequesterScores } from '../types';
import { calculateAverageScore } from './turkopticon';
import { Status } from '@shopify/polaris/types/components/Badge/Badge';

interface BadgeDescriptor {
  status: Status;
  content: string;
}

export const generateBadges = (
  requester: TOpticonData | undefined
): BadgeDescriptor[] => {
  if (!requester) {
    return [];
  }

  const allBadges: (BadgeDescriptor | null)[] = [
    calculateScoreBadge(requester.attrs)
  ];

  return allBadges.filter((el) => el !== null).slice(0, 3) as BadgeDescriptor[];
};

export const calculateScoreBadge = (
  scores: RequesterScores
): BadgeDescriptor => {
  const average = calculateAverageScore(scores);
  const status = assignScoreColor(average);
  return {
    status,
    content: generateContentString(average)
  };
};

const generateContentString = (average: number | null) => {
  return average === null ? 'No T.O.' : `${average.toFixed(2)} T.O.`;
};

const assignScoreColor = (score: number | null): Status => {
  if (score === null) {
    return 'info';
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

export const calculateReviewsBadge = (
  reviews: number
): BadgeDescriptor | null => {
  const fewReviewsBadge: BadgeDescriptor = {
    content: 'Few reviews',
    status: 'attention'
  };

  return reviews < 4 ? fewReviewsBadge : null;
};
