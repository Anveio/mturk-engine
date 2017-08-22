import * as constants from '../constants';
import { SearchOptions } from '../types';

export type FormAction = FormUpdate | FormToggle;

export interface FormUpdate {
  type: constants.UPDATE_FIELD;
  field: keyof SearchOptions;
  value: string | boolean;
}

export interface FormToggle {
  type: constants.TOGGLE_FORM;
}

export const updateForm = (
  field: keyof SearchOptions,
  value: string | boolean
): FormUpdate => ({
  type: constants.UPDATE_FIELD,
  field,
  value
});

export const toggleForm = (): FormToggle => ({ type: constants.TOGGLE_FORM });
