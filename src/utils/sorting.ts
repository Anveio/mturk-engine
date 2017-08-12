import { Hit } from '../types';
export const sortByReward = (a: Hit, b: Hit) => {
  return parseFloat(b.reward) - parseFloat(a.reward);
};

export const sortByTime = (a: Hit, b: Hit) => {
  return a.time - b.time;
};
