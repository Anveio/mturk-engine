import { QueueSortingOption } from '../types';
import { UPDATE_QUEUE_SORT } from '../constants';
import { ChangeQueueSort } from 'actions/updateValue';

export default (
  state: QueueSortingOption = 'TIME_LEFT_ASC',
  action: ChangeQueueSort
) => {
  switch (action.type) {
    case UPDATE_QUEUE_SORT:
      return action.data;
    default:
      return state;
  }
};
