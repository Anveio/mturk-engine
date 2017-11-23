import { createSelector } from 'reselect';
import { RootState, PersistedState } from '../types';
import {
  validatePersistedStateKey,
  selectReduxPersistStateKey
} from '../utils/validation';

export const uploadedStateSelector = (state: RootState) => state.uploadedState;

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
