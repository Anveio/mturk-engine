import { calculateWeightedAverageScore } from '../utils/turkopticon';
import { RequesterAttributes, AttributeWeights } from '../types';

const equalizedWeights: AttributeWeights = {
  commWeight: 1,
  fairWeight: 1,
  fastWeight: 1,
  payWeight: 1
};

const noNullAttributeScores: RequesterAttributes = {
  comm: 1,
  fair: 1,
  fast: 1,
  pay: 1
};


