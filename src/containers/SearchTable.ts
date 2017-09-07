import { connect, Dispatch } from 'react-redux';
import { RootState, BlockedHit, SearchResult } from '../types';
import SearchTable, {
  Props,
  Handlers
} from '../components/SearchTable/SearchTable';
import { AcceptAction, acceptHitRequest } from '../actions/accept';
import { BlockHitAction, blockHitGroup } from '../actions/blockHitGroup';
import {
  ExpandAction,
  toggleSearchResultExpand
} from '../actions/toggleExpand';

const mapState = (state: RootState): Props => ({
  hits: state.search,
  requesters: state.requesters,
  sortingOption: state.sortingOption,
  blockedHits: state.hitBlocklist
});

type SearchTableAction = AcceptAction | BlockHitAction | ExpandAction;

const mapDispatch = (dispatch: Dispatch<SearchTableAction>): Handlers => ({
  onAccept: (hit: SearchResult) => {
    dispatch(acceptHitRequest(hit));
  },
  onHide: (hit: BlockedHit) => {
    dispatch(blockHitGroup(hit));
  },
  onToggleExpand: (hit: SearchResult) => {
    dispatch(toggleSearchResultExpand(hit));
  }
});

export default connect(mapState, mapDispatch)(SearchTable);
