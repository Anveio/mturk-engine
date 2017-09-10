import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import { FetchQueueRequest, fetchQueueRequest } from '../actions/queue';
import QueueTable, { Props, Handlers } from '../components/Queue/QueueTable';
import { queueItemsIds } from '../selectors/queue';

const mapState = (state: RootState): Props => ({
  queueItemIds: queueItemsIds(state)
});

const mapDispatch = (dispatch: Dispatch<FetchQueueRequest>): Handlers => ({
  onRefresh: () => dispatch(fetchQueueRequest())
});

export default connect(mapState, mapDispatch)(QueueTable);
