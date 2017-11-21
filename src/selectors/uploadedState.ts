import { createSelector } from 'reselect';
import { RootState, PersistedState } from '../types';
import {
  validatePersistedStateKey,
  selectReduxPersistStateKey
} from '../utils/validation';

// private displayKeys = (uploadedState: Partial<PersistedState>) => {
// const stateKeys = Object.keys(uploadedState)
//   .filter(validatePersistedStateKey)
//   .map(selectReduxPersistStateKey);

export const uploadedStateSelector = (state: RootState) => state.uploadedState;

export const validUploadedState = createSelector(
  [uploadedStateSelector],
  (uploadedState: Partial<PersistedState>) => {
    if (!uploadedState) {
      return uploadedState;
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
