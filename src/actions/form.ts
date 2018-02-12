import { UPDATE_FIELD } from '../constants';
import { FormTarget } from '../types';

export type FormValue = string | boolean | number;

export interface FormUpdate<T> {
  readonly type: UPDATE_FIELD;
  readonly form: FormTarget;
  readonly field: keyof T;
  readonly value: FormValue;
}

export const updateForm = <T>(
  form: FormTarget,
  field: keyof T,
  value: FormValue
): FormUpdate<T> => ({
  type: UPDATE_FIELD,
  form,
  field,
  value
});
