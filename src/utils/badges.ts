import { Requester } from '../types';
// import { calculateAverageScore } from './turkopticon';

interface BadgeData {
  status: 'success' | 'info' | 'attention' | 'warning';
  text: string;
}

export const analyzeRequester = (requester: Requester): BadgeData[] => {
  return [
    {
      status: 'success',
      text: 'High TO'
    }
  ];
};

// const calculateScoreBadge = (scores: RequesterScores) => {
//   const average = parseFloat(calculateAverageScore(scores));

// };

// const isMedium = (score: number) => {
//   return (score > 2.5 && score < 3)
// };

// const isGood = (score: number) => {
//   return (score >)
// };
