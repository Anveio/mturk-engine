import { connect, Dispatch } from 'react-redux';
import SearchCard, {
  Props,
  OwnProps,
  Handlers
} from '../components/SearchCard/SearchCard';
import { SearchResult, BlockedHit, RootState } from '../types';
import { AcceptAction, acceptHitRequestfromSearch } from '../actions/accept';
import { MarkHitAsRead, markHitAsRead } from '../actions/markAsRead';
import { BlockHitAction, blockHitGroup } from '../actions/blockHitGroup';
import {
  ExpandAction,
  toggleSearchResultExpand
} from '../actions/toggleExpand';

type SearchTableAction =
  | AcceptAction
  | BlockHitAction
  | ExpandAction
  | MarkHitAsRead;

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  hit: state.search.get(ownProps.groupId)
});

const mapDispatch = (dispatch: Dispatch<SearchTableAction>): Handlers => ({
  onAccept: (hit: SearchResult) => {
    dispatch(acceptHitRequestfromSearch(hit));
  },
  onHide: (hit: BlockedHit) => {
    dispatch(blockHitGroup(hit));
  },
  onToggleExpand: (hit: SearchResult) => {
    dispatch(toggleSearchResultExpand(hit));
  },
  markHitAsRead: (groupId: string) => {
    dispatch(markHitAsRead(groupId));
  }
});

export default connect(mapState, mapDispatch)(SearchCard);
