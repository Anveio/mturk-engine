import { Requester, RequesterScores } from '../types';
import { calculateAverageScore } from './turkopticon';

type Status = 'success' | 'info' | 'attention' | 'warning';

interface BadgeDescriptor {
  status: Status;
  content: string;
}

export const generateBadges = (
  requester: Requester | undefined
): BadgeDescriptor[] => {
  if (!requester) {
    return [];
  }

  const allBadges: (BadgeDescriptor | null)[] = [
    calculateScoreBadge(requester.attrs),
    calculateReviewsBadge(requester.reviews)
  ];

  return allBadges.filter(el => el !== null).slice(0, 3) as BadgeDescriptor[];
};

const calculateScoreBadge = (scores: RequesterScores): BadgeDescriptor => {
  const average = calculateAverageScore(scores);
  const status = assignScoreColor(parseFloat(average));
  return {
    status,
    content: `${average} T.O.`
  };
};

const assignScoreColor = (score: number): Status => {
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

const calculateReviewsBadge = (reviews: number): BadgeDescriptor | null => {
  const lowReviewsBadge: BadgeDescriptor = {
    content: 'Few reviews',
    status: 'attention'
  };

  return reviews < 4 ? lowReviewsBadge : null;
};
