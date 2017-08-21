import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import { QueueAction } from '../actions/queue';
import QueueTable, { Props, Handlers } from '../components/Queue/QueueTable';
import { fetchQueue } from '../requests/fetchQueue';

const mapState = (state: RootState): Props => ({
  queue: state.queue
});

const mapDispatch = (dispatch: Dispatch<QueueAction>): Handlers => ({
  onRefresh: fetchQueue(dispatch)
});

export default connect(mapState, mapDispatch)(QueueTable);
