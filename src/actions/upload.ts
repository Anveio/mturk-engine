import { UPLOAD_FAILURE, UPLOAD_REQUEST, UPLOAD_SUCCESS } from '../constants';
import { ReduxPersistObject } from '../types';

export interface UploadRequest {
  readonly type: UPLOAD_REQUEST;
  readonly payload: File;
}

export interface UploadSuccess {
  readonly type: UPLOAD_SUCCESS;
  readonly payload: ReduxPersistObject;
}

export interface UploadFailure {
  readonly type: UPLOAD_FAILURE;
  readonly payload: Error;
}

export const uploadRequest = (file: File): UploadRequest => ({
  type: UPLOAD_REQUEST,
  payload: file
});

export const uploadSuccess = (payload: ReduxPersistObject): UploadSuccess => ({
  type: UPLOAD_SUCCESS,
  payload
});

export const uploadFailure = (err: Error): UploadFailure => ({
  type: UPLOAD_FAILURE,
  payload: err
});
