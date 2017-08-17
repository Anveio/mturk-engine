import { connect, Dispatch } from 'react-redux';
import EmptyQueue, { Handlers } from '../components/Queue/EmptyQueue';
import { queryMturkAndTOpticon, FetchAction } from '../requests/fetchQueue';

const mapDispatch = (dispatch: Dispatch<FetchAction>): Handlers => ({
  onRefresh: queryMturkAndTOpticon(dispatch)
});

export default connect(null, mapDispatch)(EmptyQueue);
