import { AttributeWeights, RequesterAttributes } from '../../types';

export const equalizedWeights: AttributeWeights = {
  commWeight: 1,
  fairWeight: 1,
  fastWeight: 1,
  payWeight: 1
};

export const equalizedButAtNotOne: AttributeWeights = {
  commWeight: 2,
  fairWeight: 2,
  fastWeight: 2,
  payWeight: 2
};

export const payEmphasizingWeights: AttributeWeights = {
  commWeight: 1,
  fairWeight: 1,
  fastWeight: 1,
  payWeight: 5
};

export const allZeroWeights: AttributeWeights = {
  commWeight: 0,
  fairWeight: 0,
  fastWeight: 0,
  payWeight: 0
};

export const noUndefinedAttributeScores: RequesterAttributes = {
  comm: 2,
  fair: 3,
  fast: 4,
  pay: 5
};

export const someUndefinedAttributeScores: Partial<RequesterAttributes> = {
  comm: 5,
  fast: 4
};

export const allUndefinedAttributeScores: Partial<RequesterAttributes> = {};
