import { connect, Dispatch } from 'react-redux';
import {
  RootState,
  BlockedHit,
  SearchResult,
  BlockedRequester
} from '../types';
import SearchTable, {
  Props,
  Handlers
} from '../components/SearchTable/SearchTable';
import { AcceptAction, acceptHitRequest } from '../actions/accept';
import { BlockHitAction, blockHitGroup } from '../actions/blockHitGroup';
import {
  BlockRequesterAction,
  blockRequester
} from '../actions/blockRequester';
import {
  ExpandAction,
  toggleSearchResultExpand
} from '../actions/toggleExpand';

const mapState = (state: RootState): Props => ({
  hits: state.search,
  sortingOption: state.sortingOption,
  blockedHits: state.hitBlocklist,
  blockedRequesters: state.requesterBlocklist
});

type SearchTableAction =
  | AcceptAction
  | BlockHitAction
  | ExpandAction
  | BlockRequesterAction;

const mapDispatch = (dispatch: Dispatch<SearchTableAction>): Handlers => ({
  onAccept: (hit: SearchResult) => {
    dispatch(acceptHitRequest(hit));
  },
  onHide: (hit: BlockedHit) => {
    dispatch(blockHitGroup(hit));
  },
  onToggleExpand: (hit: SearchResult) => {
    dispatch(toggleSearchResultExpand(hit));
  },
  onBlockRequester: (requester: BlockedRequester) => {
    dispatch(blockRequester(requester));
  }
});

export default connect(mapState, mapDispatch)(SearchTable);
