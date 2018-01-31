import { createSelector } from 'reselect';
import { Map } from 'immutable';
import {
  RootState,
  PersistedState,
  ImmutablePersistedStateKey,
  ImmutablePersistedDataType
} from '../types';
import {
  validatePersistedStateKey,
  selectReduxPersistStateKey
} from '../utils/validation';
import { immutableStateKeyLookup, parseImmutableJson } from '../utils/backup';
import { uploadedStateSelector } from './index';

export const validUploadedState = createSelector(
  [uploadedStateSelector],
  (uploadedState: Object) => {
    if (!uploadedState) {
      return null;
    }

    const stateKeys = Object.keys(uploadedState)
      .filter(validatePersistedStateKey)
      .map(selectReduxPersistStateKey);

    return stateKeys.reduce(
      (acc: Partial<PersistedState>, key) => ({
        ...acc,
        [key]: uploadedState[key]
      }),
      {}
    );
  }
);

const getUploadedStateKeyValue = (
  state: RootState,
  stateKeyProp: string
): string | null => {
  if (!state.uploadedState) {
    return null;
  } else {
    return state.uploadedState[`reduxPersist:${stateKeyProp}`] || null;
  }
};

const uploadedStateKeyIsImmutableObject = (
  state: RootState,
  stateKeyProp: ImmutablePersistedStateKey
): boolean => {
  return !!state.uploadedState && immutableStateKeyLookup.has(stateKeyProp);
};

const immutableStateKeyValue = createSelector(
  [getUploadedStateKeyValue, uploadedStateKeyIsImmutableObject],
  (value, isImmutableStateKey) => {
    if (value && isImmutableStateKey) {
      return parseImmutableJson(value);
    } else {
      return null;
    }
  }
);

export const numImmutableEntries = createSelector(
  [immutableStateKeyValue],
  (
    immutableObj: Map<
      ImmutablePersistedStateKey,
      ImmutablePersistedDataType
    > | null
  ) => (immutableObj ? immutableObj.size : null)
);
