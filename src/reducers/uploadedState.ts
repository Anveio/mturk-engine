import { UploadSuccess, UploadFailure } from '../actions/upload';
import { UPLOAD_SUCCESS, UPLOAD_FAILURE } from '../constants';
import { PersistedState } from '../types';

export default (
  state: Partial<PersistedState> = {},
  action: UploadSuccess | UploadFailure
) => {
  switch (action.type) {
    case UPLOAD_SUCCESS:
      return action.payload;
    case UPLOAD_FAILURE:
      return {};
    default:
      return state;
  }
};
