import * as constants from '../constants';
import { SearchOptions, FormTarget, TOpticonSettings } from '../types';

export type FormPayloads = SearchOptions | TOpticonSettings;

export type FormAction<T extends FormPayloads> = FormUpdate<T> | FormToggle;
export type FormValue = string | boolean;

export interface FormUpdate<T> {
  type: constants.UPDATE_FIELD;
  form: FormTarget;
  field: keyof T;
  value: FormValue;
}

export interface FormToggle {
  type: constants.TOGGLE_FORM;
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

export const toggleForm = (): FormToggle => ({ type: constants.TOGGLE_FORM });
