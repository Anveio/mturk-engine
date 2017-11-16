import { READ_PERSISTED_STATE } from '../constants';

export interface ReadPersistedState {
  readonly type: READ_PERSISTED_STATE;
}

export const readPersistedState = (): ReadPersistedState => ({
  type: READ_PERSISTED_STATE
});

