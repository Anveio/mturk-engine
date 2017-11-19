import { READ_PERSISTED_STATE, WRITE_PERSISTED_STATE } from '../constants';
import { PersistedState } from '../types';

export interface ReadPersistedState {
  readonly type: READ_PERSISTED_STATE;
}

export interface WritePersistedState {
  readonly type: WRITE_PERSISTED_STATE;
  readonly payload: Partial<PersistedState>;
}

export const readPersistedState = (): ReadPersistedState => ({
  type: READ_PERSISTED_STATE
});

export const writePersistedState = (
  payload: Partial<PersistedState>
): WritePersistedState => ({
  type: WRITE_PERSISTED_STATE,
  payload
});
