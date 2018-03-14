import { calculateWeightedAverageScore } from '../../utils/turkopticon';
import {
  noUndefinedAttributeScores,
  equalizedWeights,
  equalizedButAtNotOne,
  someUndefinedAttributeScores,
  allUndefinedAttributeScores,
  allZeroWeights,
  payEmphasizingWeights
} from './fixtures';

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
