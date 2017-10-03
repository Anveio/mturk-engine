import * as constants from '../constants';
import { SearchOptions, FormTarget, TOpticonSettings } from '../types';

export type FormPayloads = SearchOptions | TOpticonSettings;

export type FormValue = string | boolean;

export interface FormUpdate<T> {
  readonly type: constants.UPDATE_FIELD;
  readonly form: FormTarget;
  readonly field: keyof T;
  readonly value: FormValue;
}

export const updateForm = <T>(
  form: FormTarget,
  field: keyof T,
  value: FormValue
): FormUpdate<T> => ({
  type: constants.UPDATE_FIELD,
  form,
  field,
  value
});
