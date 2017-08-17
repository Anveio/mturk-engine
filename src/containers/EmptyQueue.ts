import { connect, Dispatch } from 'react-redux';
import EmptyQueue, { Handlers } from '../components/Queue/EmptyQueue';
import { QueueAction } from '../actions/queue';
import { fetchQueue } from '../requests/fetchQueue';

const mapDispatch = (dispatch: Dispatch<QueueAction>): Handlers => ({
  onRefresh: fetchQueue(dispatch)
});

export default connect(null, mapDispatch)(EmptyQueue);
