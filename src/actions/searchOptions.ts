import * as constants from '../constants';
import { SearchOptions } from '../types';

export interface FormUpdate {
  type: constants.UPDATE_FIELD;
  field: keyof SearchOptions;
  value: string
}

export const updateForm = (
  field: keyof SearchOptions,
  value: string
): FormUpdate => ({
  type: constants.UPDATE_FIELD,
  field,
  value
});
