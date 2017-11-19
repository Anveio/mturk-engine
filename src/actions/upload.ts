import {
  UPLOAD_FAILURE,
  UPLOAD_PROGRESS,
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS
} from '../constants';
import { PersistedState } from '../types';

export interface UploadRequest {
  readonly type: UPLOAD_REQUEST;
  readonly payload: File;
}

export interface UploadProgress {
  readonly type: UPLOAD_PROGRESS;
  readonly payload: number;
  readonly file: File;
}

export interface UploadSuccess {
  readonly type: UPLOAD_SUCCESS;
  readonly payload: Partial<PersistedState>;
}

export interface UploadFailure {
  readonly type: UPLOAD_FAILURE;
  readonly payload: Error;
}

export const uploadRequest = (file: File): UploadRequest => ({
  type: UPLOAD_REQUEST,
  payload: file
});

export const uploadProgress = (
  file: File,
  progress: number
): UploadProgress => ({
  type: UPLOAD_PROGRESS,
  payload: progress,
  file
});

export const uploadSuccess = (
  payload: Partial<PersistedState>
): UploadSuccess => ({
  type: UPLOAD_SUCCESS,
  payload
});

export const uploadFailure = (err: Error): UploadFailure => ({
  type: UPLOAD_FAILURE,
  payload: err
});
