import * as constants from '../constants';
import { HitMap } from '../types';

export interface FetchQueueSuccess {
  type: constants.FETCH_QUEUE_SUCCESS;
  data: HitMap;
}

export type QueueAction = FetchQueueSuccess;

export const fetchQueueSuccess = (data: HitMap): FetchQueueSuccess => ({
  type: constants.FETCH_QUEUE_SUCCESS,
  data
});
