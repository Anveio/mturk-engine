import { connect, Dispatch } from 'react-redux';
import App, { Props, Handlers } from '../components/App';
import { RootState } from '../types';
import { ChangeTab, changeTab } from '../actions/tab';
import { queryMturkAndTOpticon, FetchAction } from '../requests/fetchData';

type AppAction = FetchAction | ChangeTab;

const mapState = (state: RootState): Props => ({
  selected: state.tab,
  search: state.search,
});

const mapDispatch = (dispatch: Dispatch<AppAction>): Handlers => ({
  onSelectTab: (selectedTabIndex: number) => {
    dispatch(changeTab(selectedTabIndex));
  },
  onFetch: queryMturkAndTOpticon(dispatch)
});

export default connect(mapState, mapDispatch)(App);
