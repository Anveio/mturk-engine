import {
  STATUS_SUMMARY_REQUEST,
  STATUS_SUMMARY_FAILURE,
  STATUS_SUMMARY_SUCCESS
} from '../constants';
import { List } from 'immutable';

export interface FetchStatusSummaryRequest {
  readonly type: STATUS_SUMMARY_REQUEST;
}

export interface FetchStatusSummarySuccess {
  readonly type: STATUS_SUMMARY_SUCCESS;
  readonly dateStrings: List<string>;
}

export interface FetchStatusSummaryFailure {
  readonly type: STATUS_SUMMARY_FAILURE;
}

export const statusSummaryRequest = (): FetchStatusSummaryRequest => ({
  type: STATUS_SUMMARY_REQUEST
});

export const statusSummarySuccess = (
  dateStrings: List<string>
): FetchStatusSummarySuccess => ({
  type: STATUS_SUMMARY_SUCCESS,
  dateStrings
});

export const statusSummaryFailure = (): FetchStatusSummaryFailure => ({
  type: STATUS_SUMMARY_FAILURE
});
