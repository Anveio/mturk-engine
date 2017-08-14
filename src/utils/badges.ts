import { Requester, RequesterScores } from '../types';
import { calculateAverageScore } from './turkopticon';

type Status = 'success' | 'info' | 'attention' | 'warning';
// type Progress = 'incomplete' | 'partiallyComplete' | 'complete';
// type ExceptionStatus = 'neutral' | 'warning' | 'critical';

// interface BadgeData {
//   status?: Status;
//   progress?: Progress;
//   text: string;
// }

interface BadgeDescriptor {
  status: Status;
  content: string;
}

export const calculateAllBadges = (requester: Requester): BadgeDescriptor[] => {
  const tentativeBadges: (BadgeDescriptor | null)[] = [
    calculateScoreBadge(requester.attrs),
    calculateReviewsBadge(requester.reviews)
  ];

  return tentativeBadges.filter(el => el !== null).slice(0, 3) as BadgeDescriptor[];
};

const calculateScoreBadge = (scores: RequesterScores): BadgeDescriptor => {
  const average = parseFloat(calculateAverageScore(scores));
  const status = assignScoreColor(average);
  const content = assignScoreText(status);
  return {
    status,
    content
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

const assignScoreText = (status: Status): string => {
  switch (status) {
    case 'warning':
      return 'Low T.O.';
    case 'attention':
      return 'OK T.O.';
    case 'info':
      return 'Good T.O.';
    case 'success':
      return 'Great T.O.';
    default:
      return 'Invalid average T.O.';
  }
};

const calculateReviewsBadge = (reviews: number): BadgeDescriptor | null => {
  const lowReviewsBadge: BadgeDescriptor = {
    content: 'Few reviews',
    status: 'attention'
  };

  return reviews < 4 ? lowReviewsBadge : null;
};
