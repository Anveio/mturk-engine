import { calculateWeightedAverageScore } from '../../utils/turkopticon';
import { RequesterAttributes, AttributeWeights } from '../../types';

describe('Calculating requester average T.O. score', () => {
  test('equalized weights and no undefined attributes', () => {
    expect(
      calculateWeightedAverageScore(
        noUndefinedAttributeScores,
        equalizedWeights
      )
    ).toEqual(3.5);
  });

  test('equalized weights at a value other than 1', () => {
    expect(
      calculateWeightedAverageScore(
        noUndefinedAttributeScores,
        equalizedButAtNotOne
      )
    ).toEqual(3.5);
  });

  test('equalized weights and some undefined attributes', () => {
    expect(
      calculateWeightedAverageScore(
        someUndefinedAttributeScores,
        equalizedWeights
      )
    ).toEqual(4.5);
  });

  test('equalized weights and all undefined attributes', () => {
    expect(
      calculateWeightedAverageScore(
        allUndefinedAttributeScores,
        equalizedWeights
      )
    ).toEqual(null);
  });

  test('all zero weights and no undefined attributes', () => {
    expect(
      calculateWeightedAverageScore(noUndefinedAttributeScores, allZeroWeights)
    ).toEqual(null);
  });

  test('all zero weights and some undefined attributes', () => {
    expect(
      calculateWeightedAverageScore(
        someUndefinedAttributeScores,
        allZeroWeights
      )
    ).toEqual(null);
  });

  test('all zero weights and all undefined attributes', () => {
    expect(
      calculateWeightedAverageScore(allUndefinedAttributeScores, allZeroWeights)
    ).toEqual(null);
  });

  test('weights emphasizing pay and no undefined attributes', () => {
    expect(
      calculateWeightedAverageScore(
        noUndefinedAttributeScores,
        payEmphasizingWeights
      )
    ).toEqual(4.25);
  });

  test('weights emphasizing pay and some undefined attributes', () => {
    expect(
      calculateWeightedAverageScore(
        someUndefinedAttributeScores,
        payEmphasizingWeights
      )
    ).toEqual(4.5);
  });

  test('weights emphasizing pay and all undefined attributes', () => {
    expect(
      calculateWeightedAverageScore(
        allUndefinedAttributeScores,
        payEmphasizingWeights
      )
    ).toEqual(null);
  });
});

const equalizedWeights: AttributeWeights = {
  commWeight: 1,
  fairWeight: 1,
  fastWeight: 1,
  payWeight: 1
};

const equalizedButAtNotOne: AttributeWeights = {
  commWeight: 2,
  fairWeight: 2,
  fastWeight: 2,
  payWeight: 2
};

const payEmphasizingWeights: AttributeWeights = {
  commWeight: 1,
  fairWeight: 1,
  fastWeight: 1,
  payWeight: 5
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

const allUndefinedAttributeScores: Partial<RequesterAttributes> = {};
