import { SearchItem } from '../types';
export const sortByReward = (a: SearchItem, b: SearchItem) => {
  return parseFloat(b.reward) - parseFloat(a.reward);
};

export const sortByTime = (a: SearchItem, b: SearchItem) => {
  return a.time - b.time;
};
