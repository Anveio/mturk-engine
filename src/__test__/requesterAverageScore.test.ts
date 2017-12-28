import { calculateWeightedAverageScore } from '../utils/turkopticon';
import { RequesterAttributes, AttributeWeights } from '../types';

const equalizedWeights: AttributeWeights = {
  commWeight: 1,
  fairWeight: 1,
  fastWeight: 1,
  payWeight: 1
};

const allZeroWeights: AttributeWeights = {
  commWeight: 0,
  fairWeight: 0,
  fastWeight: 0,
  payWeight: 0
};

const noNullAttributeScores: RequesterAttributes = {
  comm: 5,
  fair: 5,
  fast: 5,
  pay: 5
};

const someNullAttributeScores = {};

describe('Calculating requester average T.O. score', () => {
  test('equalized weights and no null attributes', () => {
    expect(
      calculateWeightedAverageScore(noNullAttributeScores, equalizedWeights)
    ).toEqual(5);
  });

  test('all zero weights and no null attributes', () => {
    expect(
      calculateWeightedAverageScore(noNullAttributeScores, allZeroWeights)
    ).toEqual(null);
  });
});
