import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import { FetchQueueRequest, fetchQueueRequest } from '../actions/queue';
import { ReturnHitRequest, returnHitRequest } from '../actions/return';

import QueueTable, { Props, Handlers } from '../components/Queue/QueueTable';
// import { fetchQueue } from '../dispatch/fetchQueue';
// import { returnHit } from '../dispatch/returnHit';

const mapState = (state: RootState): Props => ({
  queue: state.queue
});

type QueueTableRequest = FetchQueueRequest | ReturnHitRequest;

const mapDispatch = (dispatch: Dispatch<QueueTableRequest>): Handlers => ({
  onRefresh: () => dispatch(fetchQueueRequest()),
  onReturn: (hitId: string) => dispatch(returnHitRequest(hitId))
});

export default connect(mapState, mapDispatch)(QueueTable);
