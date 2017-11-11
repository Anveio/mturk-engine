import { READ_PERSISTED_STATE } from '../constants';

export interface ReadUserState {
  readonly type: READ_PERSISTED_STATE;
}

export const readUserState = (): ReadUserState => ({
  type: READ_PERSISTED_STATE
});
