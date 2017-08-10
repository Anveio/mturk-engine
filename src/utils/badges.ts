import { Requester, RequesterScores } from '../types';
import { calculateAverageScore } from './turkopticon';

interface BadgeData {
  status: Status;
  text: string;
}

type Status = 'success' | 'info' | 'attention' | 'warning';

export const analyzeRequester = (requester: Requester): BadgeData[] => {
  const badges: BadgeData[] = [ calculateScoreBadge(requester.attrs) ];

  return badges.filter((el: BadgeData) => el !== null).slice(0, 3);
};

const calculateScoreBadge = (scores: RequesterScores): BadgeData => {
  const average = parseFloat(calculateAverageScore(scores));
  const status = assignScoreColor(average);
  const text = assignScoreText(status);
  return {
    status,
    text
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

// const isMedium = (score: number) => {
//   return (score > 2.5 && score < 3)
// };

// const isGood = (score: number) => {
//   return (score >)
// };
