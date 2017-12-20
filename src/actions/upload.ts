import {
  UPLOAD_FAILURE,
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
  REMOVE_UPLOADED_FILE
} from '../constants';
import { PersistedState } from '../types';

export interface UploadRequest {
  readonly type: UPLOAD_REQUEST;
  readonly payload: File;
}

export interface UploadSuccess {
  readonly type: UPLOAD_SUCCESS;
  readonly payload: Partial<PersistedState>;
}

export interface UploadFailure {
  readonly type: UPLOAD_FAILURE;
  readonly payload: Error;
}

export interface RemoveUploadedFile {
  readonly type: REMOVE_UPLOADED_FILE;
}

export const uploadRequest = (file: File): UploadRequest => ({
  type: UPLOAD_REQUEST,
  payload: file
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

export const removeUploadedFile = (): RemoveUploadedFile => ({
  type: REMOVE_UPLOADED_FILE
});
