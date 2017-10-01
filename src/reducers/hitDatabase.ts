import { HitDatabaseEntry, HitDatabaseMap } from '../types';
import { FetchStatusDetailSuccess } from '../actions/statusDetail';
import { STATUS_DETAIL_SUCCESS } from '../constants';
import { Map } from 'immutable';
import sampleHitDB from '../utils/sampleHitDatabase';

const initial: HitDatabaseMap = Map<string, HitDatabaseEntry>(sampleHitDB);

export default (
  state = initial,
  action: FetchStatusDetailSuccess
): HitDatabaseMap => {
  switch (action.type) {
    case STATUS_DETAIL_SUCCESS:
      return state.merge(action.data);
    default:
      return state;
  }
};
