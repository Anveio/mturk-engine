import {
  STATUS_SUMMARY_REQUEST,
  STATUS_SUMMARY_FAILURE,
  STATUS_SUMMARY_SUCCESS
} from '../constants';

export interface FetchStatusSummaryRequest {
  readonly type: STATUS_SUMMARY_REQUEST;
}

export interface FetchStatusSummarySuccess {
  readonly type: STATUS_SUMMARY_SUCCESS;
}

export interface FetchStatusSummaryFailure {
  readonly type: STATUS_SUMMARY_FAILURE;
}

export const statusSummaryRequest = (): FetchStatusSummaryRequest => ({
  type: STATUS_SUMMARY_REQUEST
});

export const statusSummarySuccess = (): FetchStatusSummarySuccess => ({
  type: STATUS_SUMMARY_SUCCESS
});

export const statusSummaryFailure = (): FetchStatusSummaryFailure => ({
  type: STATUS_SUMMARY_FAILURE
});
