import { HitDatabaseEntry, HitDatabaseMap } from '../types';
import { FetchStatusDetailSuccess } from '../actions/statusDetail';
import { EditBonus } from '../actions/bonus';
import { STATUS_DETAIL_SUCCESS, EDIT_BONUS } from '../constants';
import { Map } from 'immutable';
import { conflictsPreserveBonus } from '../utils/hitDatabase';
// import sampleHitDB from '../utils/sampleHitDatabase';

const initial: HitDatabaseMap = Map<string, HitDatabaseEntry>();

export default (
  state = initial,
  action: FetchStatusDetailSuccess | EditBonus
): HitDatabaseMap => {
  switch (action.type) {
    case STATUS_DETAIL_SUCCESS:
      return state.mergeWith(conflictsPreserveBonus, action.data);
    case EDIT_BONUS:
      return state.update(action.id, (hit) => ({
        ...hit,
        bonus: action.bonus
      }));
    default:
      return state;
  }
};
