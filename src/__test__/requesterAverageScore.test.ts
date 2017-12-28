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

const noUndefinedAttributeScores: RequesterAttributes = {
  comm: 2,
  fair: 3,
  fast: 4,
  pay: 5
};

const someUndefinedAttributeScores: Partial<RequesterAttributes> = {
  comm: 5,
  fast: 4
};

describe('Calculating requester average T.O. score', () => {
  test('equalized weights and no undefined attributes', () => {
    expect(
      calculateWeightedAverageScore(
        noUndefinedAttributeScores,
        equalizedWeights
      )
    ).toEqual(3.5);
  });

  test('all zero weights and no undefined attributes', () => {
    expect(
      calculateWeightedAverageScore(noUndefinedAttributeScores, allZeroWeights)
    ).toEqual(null);
  });

  test('equalized weights and some undefined attributes', () => {
    expect(
      calculateWeightedAverageScore(
        someUndefinedAttributeScores,
        equalizedWeights
      )
    ).toEqual(4.5);
  });
});
