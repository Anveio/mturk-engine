import {
  UploadSuccess,
  UploadFailure,
  RemoveUploadedFile
} from '../actions/upload';
import {
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  REMOVE_UPLOADED_FILE
} from '../constants';
import { PersistedState } from '../types';

export default (
  state: Partial<PersistedState> | null = null,
  action: UploadSuccess | UploadFailure | RemoveUploadedFile
) => {
  switch (action.type) {
    case UPLOAD_SUCCESS:
      return action.payload;
    case UPLOAD_FAILURE:
    case REMOVE_UPLOADED_FILE:
      return null;
    default:
      return state;
  }
};
