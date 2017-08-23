import { connect, Dispatch } from 'react-redux';
import { RootState, SortingOption, BlockedHit } from '../types';
import HitTable, {
  Props,
  Handlers
} from '../components/SearchTable/SearchTable';
import { AcceptAction } from '../actions/accept';
import { BlockAction, blockHitGroup } from '../actions/blocklist';
import { ChangeSorting, changeSorting } from '../actions/sorting';
import { sendAcceptRequest } from '../dispatch/acceptHit';

const mapState = (state: RootState): Props => ({
  hits: state.search,
  requesters: state.requesters,
  sortingOption: state.sortingOption,
  blockedHits: state.hitBlocklist
});

type SearchTableAction = AcceptAction | ChangeSorting | BlockAction;

const mapDispatch = (dispatch: Dispatch<SearchTableAction>): Handlers => ({
  onAccept: sendAcceptRequest(dispatch),
  onChangeSort: (option: SortingOption) => {
    dispatch(changeSorting(option));
  },
  onHide: (hit: BlockedHit) => {
    dispatch(blockHitGroup(hit));
  }
});

export default connect(mapState, mapDispatch)(HitTable);
