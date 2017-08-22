import { connect, Dispatch } from 'react-redux';
import { RootState, SortingOption } from '../types';
import HitTable, { Props, Handlers } from '../components/SearchTable/SearchTable';
import { AcceptAction } from '../actions/accept';
import { ChangeSorting, changeSorting } from '../actions/sorting';
import { sendAcceptRequest } from '../requests/acceptHit';

const mapState = (state: RootState): Props => ({
  hits: state.search,
  requesters: state.requesters,
  sortingOption: state.sortingOption
});

type SearchTableAction = AcceptAction | ChangeSorting;

const mapDispatch = (dispatch: Dispatch<SearchTableAction>): Handlers => ({
  onAccept: sendAcceptRequest(dispatch),
  onChangeSort: (option: SortingOption) => {
    dispatch(changeSorting(option));
  }
});

export default connect(mapState, mapDispatch)(HitTable);
