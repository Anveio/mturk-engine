import { connect, Dispatch } from 'react-redux';
import { RootState, SortingOption, BlockedHit, SearchItem } from '../types';
import HitTable, {
  Props,
  Handlers
} from '../components/SearchTable/SearchTable';
import { AcceptAction, acceptHitRequest } from '../actions/accept';
import { BlockAction, blockHitGroup } from '../actions/blocklist';
import { ChangeSorting, changeSorting } from '../actions/sorting';

const mapState = (state: RootState): Props => ({
  hits: state.search,
  requesters: state.requesters,
  sortingOption: state.sortingOption,
  blockedHits: state.hitBlocklist
});

type SearchTableAction = AcceptAction | ChangeSorting | BlockAction;

const mapDispatch = (dispatch: Dispatch<SearchTableAction>): Handlers => ({
  onAccept: (hit: SearchItem) => {
    dispatch(acceptHitRequest(hit));
  },
  onChangeSort: (option: SortingOption) => {
    dispatch(changeSorting(option));
  },
  onHide: (hit: BlockedHit) => {
    dispatch(blockHitGroup(hit));
  }
});

export default connect(mapState, mapDispatch)(HitTable);
