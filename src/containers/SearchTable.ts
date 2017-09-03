import { connect, Dispatch } from 'react-redux';
import { RootState, BlockedHit, SearchResult } from '../types';
import HitTable, {
  Props,
  Handlers
} from '../components/SearchTable/SearchTable';
import { AcceptAction, acceptHitRequest } from '../actions/accept';
import { BlockAction, blockHitGroup } from '../actions/blocklist';

const mapState = (state: RootState): Props => ({
  hits: state.search,
  requesters: state.requesters,
  sortingOption: state.sortingOption,
  blockedHits: state.hitBlocklist
});

type SearchTableAction = AcceptAction | BlockAction;

const mapDispatch = (dispatch: Dispatch<SearchTableAction>): Handlers => ({
  onAccept: (hit: SearchResult) => {
    dispatch(acceptHitRequest(hit));
  },
  onHide: (hit: BlockedHit) => {
    dispatch(blockHitGroup(hit));
  }
});

export default connect(mapState, mapDispatch)(HitTable);
