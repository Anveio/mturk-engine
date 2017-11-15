import {
  UPLOAD_FAILURE,
  UPLOAD_PROGRESS,
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS
} from '../constants';

export interface UploadRequest {
  readonly type: UPLOAD_REQUEST;
  readonly payload: File;
}

export interface UploadProgress {
  readonly type: UPLOAD_PROGRESS;
  readonly payload: number;
  readonly meta: {
    readonly file: File;
  };
}

export interface UploadSuccess {
  readonly type: UPLOAD_SUCCESS;
  readonly meta: {
    readonly file: File;
  };
}

export interface UploadFailure {
  readonly type: UPLOAD_FAILURE;
  readonly payload: Error;
  readonly error: true;
  readonly meta: {
    file: File;
  };
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
  meta: { file }
});

export const uploadSuccess = (file: File): UploadSuccess => ({
  type: UPLOAD_SUCCESS,
  meta: { file }
});

export const uploadFailure = (file: File, err: Error): UploadFailure => ({
  type: UPLOAD_FAILURE,
  payload: err,
  error: true,
  meta: { file }
});
