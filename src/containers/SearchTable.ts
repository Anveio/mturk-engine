import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import HitTable, { Props, Handlers } from '../components/SearchTable/SearchTable';
import { AcceptAction } from '../actions/accept';
import { sendAcceptRequest } from '../requests/acceptHit';

const mapState = (state: RootState): Props => ({
  hits: state.search,
  requesters: state.requesters
});

const mapDispatch = (dispatch: Dispatch<AcceptAction>): Handlers => ({
  onAccept: sendAcceptRequest(dispatch)
});

export default connect(mapState, mapDispatch)(HitTable);
