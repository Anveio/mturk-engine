import { API_LIMIT_EXCEEDED } from '../constants';
import { GroupId } from 'types';

export interface ApiRateLimitExceeded {
  readonly type: API_LIMIT_EXCEEDED;
  readonly watcherId: GroupId;
}

export const watcherExceededApiLimit = (
  watcherId: GroupId
): ApiRateLimitExceeded => ({
  type: API_LIMIT_EXCEEDED,
  watcherId
});
