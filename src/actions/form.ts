import * as constants from '../constants';
import { SearchOptions, FormTarget, TOpticonSettings } from '../types';

export type FormPayloads = SearchOptions | TOpticonSettings;

export type FormValue = string | boolean;

export interface FormUpdate<T> {
  type: constants.UPDATE_FIELD;
  form: FormTarget;
  field: keyof T;
  value: FormValue;
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
