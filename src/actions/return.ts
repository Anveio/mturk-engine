import {
  RETURN_HIT_REQUEST,
  RETURN_HIT_FAILURE,
  RETURN_HIT_SUCCESS
} from '../constants';
import { QueueItem } from '../types';

export interface ReturnHitFailure {
  readonly type: RETURN_HIT_FAILURE;
}

export interface ReturnHitSuccess {
  readonly type: RETURN_HIT_SUCCESS;
  readonly hitId: string;
}

export interface ReturnHitRequest {
  readonly type: RETURN_HIT_REQUEST;
  readonly queueItem: QueueItem;
}

export type ReturnAction =
  | ReturnHitFailure
  | ReturnHitSuccess
  | ReturnHitRequest;

export const returnHitRequest = (queueItem: QueueItem): ReturnHitRequest => ({
  type: RETURN_HIT_REQUEST,
  queueItem
});

export const returnHitFailure = (): ReturnHitFailure => ({
  type: RETURN_HIT_FAILURE
});

export const returnHitSuccess = (hitId: string): ReturnHitSuccess => ({
  type: RETURN_HIT_SUCCESS,
  hitId
});
