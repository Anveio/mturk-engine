import { Hit } from '../types';
export const sortByReward = (a: Hit, b: Hit) => {
  return parseFloat(a.reward) - parseFloat(b.reward);
};

export const sortByTime = (a: Hit, b: Hit) => {
  return a.time - b.time;
};
